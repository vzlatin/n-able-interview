import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  forkJoin,
  map,
  Observable,
  of,
  scan,
  switchMap,
  throwError,
} from "rxjs";
import { UserCard } from "../types/user-card";
import { environment } from "../../environments/environment.development";
import { User } from "../types/user";
import { isPrivateUser } from "../typeguards/isPrivateUser";
import { DataResponse, requiredKeys, UserWithRepositoriesResponse } from "../types/utils";
import { MinimalRepository } from "../types/repositories";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  private http = inject(HttpClient);
  private selectedUserSubject = new BehaviorSubject<string | null>(null);
  private loadNextTenCards$ = new BehaviorSubject<string | null>(null);

  userCards$: Observable<UserCard[]> = this.loadNextTenCards$.pipe(
    map((since) => since != null ? `&since=${since}` : ""),
    switchMap((since) =>
      this.http.get<UserCard[]>(
        `${environment.baseUrl}/users?per_page=${environment.itemsPerPage}${since}`,
      ).pipe(
        map((users: UserCard[]) =>
          users.map((user: UserCard) => ({
            ...user,
            name: user.name ?? "Name: N/A",
            email: user.email ?? "Email: N/A",
          }))
        ),
        catchError(() => of([])),
      )
    ),
    scan(
      (acc, newUserCards) => [...acc, ...newUserCards],
      [] as UserCard[],
    ),
  );

  user$: Observable<DataResponse<User>> = this.selectedUserSubject.pipe(
    filter(Boolean),
    switchMap((username) =>
      this.http.get<User>(`${environment.baseUrl}/users/${username}`).pipe(
        map((user) => ({
          data: {
            ...user,
            type: isPrivateUser(user) ? 'private' : 'public',
          },
          error: null,
        })),
        catchError(() => of({ data: null, error: 'Failed to load user data.' }))
      )
    )
  );
  
  repositories$: Observable<DataResponse<MinimalRepository[]>> = this.selectedUserSubject.pipe(
    filter(Boolean),
    switchMap((username) =>
      this.http.get<MinimalRepository[]>(`${environment.baseUrl}/users/${username}/repos`).pipe(
        map((repositories) => ({
          data: repositories,
          error: null,
        })),
        catchError(() => of({ data: [], error: 'Failed to load repositories.' }))
      )
    )
  );
  
  userWithRepositories$: Observable<UserWithRepositoriesResponse> = combineLatest([this.user$, this.repositories$]).pipe(
    map(([userResult, repoResult]) => ({
      user: userResult.data,
      userError: userResult.error,
      repositories: repoResult.data,
      repoError: repoResult.error,
    }))
  );
  

  selectUser(username: string): void {
    this.selectedUserSubject.next(username);
  }

  loadNextTenCards(userId: string | null): void {
    this.loadNextTenCards$.next(userId);
  }
}

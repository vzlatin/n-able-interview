import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  ignoreElements,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from "rxjs";
import { UserCard } from "../types/user-card";
import { environment } from "../../environments/environment.development";
import { User } from "../types/user";
import { isPrivateUser } from "../typeguards/isPrivateUser";
import { requiredKeys } from "../types/utils";
import { MinimalRepository } from "../types/repositories";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  private http = inject(HttpClient);
  private selectedUserSubject = new Subject<string | null>();
  private loadNextTenCards$ = new Subject<string | null>();

  userCards$ = this.loadNextTenCards$.pipe(
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
      )
    ),
  );

  user$: Observable<User & { type: string }> = this.selectedUserSubject
    .pipe(
      filter(Boolean),
      switchMap((username) =>
        this.http.get<User>(
          `${environment.baseUrl}/users/${username}`,
        )
      ),
      map((user) => ({
        ...user,
        type: isPrivateUser(user, requiredKeys) ? "private" : "public",
      })),
    );

  repositories$: Observable<MinimalRepository[]> = this
    .selectedUserSubject
    .pipe(
      filter(Boolean),
      switchMap((username) =>
        this.http.get<MinimalRepository[]>(
          `${environment.baseUrl}/users/${username}/repos`,
        )
      ),
    );

  userWithRepositories$ = combineLatest([
    this.user$,
    this.repositories$,
  ]).pipe(
    map(([user, repositories]) => ({
      ...user,
      repositories,
    })),
  );

  userWithRepositoriesError$: Observable<Error> = this.userWithRepositories$
    .pipe(
      ignoreElements(),
      catchError((err: Error) => of(err)),
    );

  selectUser(username: string): void {
    this.selectedUserBehaviorSubject.next(username);
  }
}

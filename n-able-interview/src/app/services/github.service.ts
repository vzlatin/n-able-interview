import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import {
  BehaviorSubject,
  catchError,
  filter,
  ignoreElements,
  map,
  Observable,
  of,
  switchMap,
} from "rxjs";
import { UserCard } from "../types/user-card";
import { environment } from "../../environments/environment.development";
import { User } from "../types/user";
import { isPrivateUser } from "../typeguards/isPrivateUser";
import { requiredKeys } from "../types/utils";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  private http = inject(HttpClient);
  private selectedUserBehaviorSubject = new BehaviorSubject<string | null>(
    null,
  );

  userCards$: Observable<UserCard[]> = this.http.get<UserCard[]>(
    `${environment.baseUrl}/users?per_page=${environment.itemsPerPage}`,
  ).pipe(
    map((users: UserCard[]) =>
      users.map((user: UserCard) => ({
        ...user,
        name: user.name ?? "Name: N/A",
        email: user.email ?? "Email: N/A",
      }))
    ),
  );
  userCardsError$: Observable<Error> = this.userCards$.pipe(
    ignoreElements(),
    catchError((err: Error) => of(err)),
  );

  user$: Observable<User & { type: string }> = this.selectedUserBehaviorSubject
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
  userError$: Observable<Error> = this.user$.pipe(
    ignoreElements(),
    catchError((err: Error) => of(err)),
  );

  selectUser(username: string): void {
    this.selectedUserBehaviorSubject.next(username);
  }
}

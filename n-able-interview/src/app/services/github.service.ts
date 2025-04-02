import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, ignoreElements, map, Observable, of } from "rxjs";
import { UserCard } from "../types/entities";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  http = inject(HttpClient);
  constructor() {}

  users$: Observable<UserCard[]> = this.http.get<UserCard[]>(
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
  usersError$: Observable<Error> = this.users$.pipe(
    ignoreElements(),
    catchError((err: Error) => of(err)),
  );
}

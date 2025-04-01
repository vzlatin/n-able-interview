import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, ignoreElements, Observable, of } from "rxjs";
import { User } from "../types/entities";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class GithubService {
  http = inject(HttpClient);
  constructor() {}

  users$: Observable<User[]> = this.http.get<User[]>(
    `${environment.baseUrl}/users?per_page=${environment.itemsPerPage}`,
  );
  usersError$: Observable<Error> = this.users$.pipe(
    ignoreElements(),
    catchError((err: Error) => of(err)),
  );
}

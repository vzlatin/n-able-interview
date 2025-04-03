import { ResolveFn } from "@angular/router";
import { User } from "../types/user";
import { inject } from "@angular/core";
import { GithubService } from "../services/github.service";

export const userResolver: ResolveFn<User> = (route) => {
  const githubService = inject(GithubService);
  const username = route.params["username"];
  githubService.selectUser(username);
  return githubService.userWithRepositories$;
};

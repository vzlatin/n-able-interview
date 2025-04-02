import { Component, inject } from "@angular/core";
import { GithubService } from "../../services/github.service";
import { AsyncPipe } from "@angular/common";
import { UserCardComponent } from "../user-card/user-card.component";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  private githubService = inject(GithubService);
  private router = inject(Router);

  users$ = this.githubService.users$;
  usersError$ = this.githubService.usersError$;

  constructor() {}
  goToUser(username: string): void {
    this.router.navigate(["users", username]);
  }
}

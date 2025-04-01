import { Component, inject } from "@angular/core";
import { GithubService } from "../../services/github.service";
import { AsyncPipe } from "@angular/common";
import { UserCardComponent } from "../user-card/user-card.component";

@Component({
  selector: "app-home",
  imports: [AsyncPipe, UserCardComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
})
export class HomeComponent {
  githubService = inject(GithubService);
  users$ = this.githubService.users$;
  usersError$ = this.githubService.usersError$;
}

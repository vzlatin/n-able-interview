import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GithubService } from "./services/github.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "n-able-interview";
  githubService = inject(GithubService);
  users$ = this.githubService.users$;
  usersError$ = this.githubService.usersError$;
}

import { Component, inject, input } from "@angular/core";
import { UserCard } from "../../types/user-card";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-card",
  imports: [],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  router = inject(Router);
  user = input.required<UserCard>();

  selectUser(): void {
    this.router.navigate(["users", this.user().login]);
  }
}

import { Component, inject, input } from "@angular/core";
import { UserCard } from "../../types/user-card";
import { Router } from "@angular/router";
import { VisibleDirective } from "../../directives/visible.directive";
import { GithubService } from "../../services/github.service";

@Component({
  selector: "app-user-card",
  imports: [VisibleDirective],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  private router = inject(Router);
  private githubService = inject(GithubService);
  userCard = input.required<UserCard>();
  isLast = input.required<boolean>();

  selectUser(): void {
    this.router.navigate(["users", this.userCard().login]);
  }

  emitSince(userId: string): void {
    this.githubService.loadNextTenCards(userId);
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }
}

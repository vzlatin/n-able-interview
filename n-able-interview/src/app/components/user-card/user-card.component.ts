import { Component, input } from "@angular/core";
import { UserCard } from "../../types/entities";

@Component({
  selector: "app-user-card",
  imports: [],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  user = input.required<UserCard>();
}

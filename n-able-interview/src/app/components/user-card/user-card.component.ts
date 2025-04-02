import { Component, input, output } from "@angular/core";
import { UserCard } from "../../types/user-card";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-user-card",
  imports: [RouterLink],
  templateUrl: "./user-card.component.html",
  styleUrl: "./user-card.component.css",
})
export class UserCardComponent {
  user = input.required<UserCard>();
  navigationEmitter = output<string>();
}

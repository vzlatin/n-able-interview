import { Component, inject } from "@angular/core";
import { AsyncPipe, TitleCasePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";
import { isPrivateUser } from "../../typeguards/isPrivateUser";
import { requiredKeys } from "../../types/utils";

@Component({
  selector: "app-user-profile",
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent {
  activatedRoute = inject(ActivatedRoute);
  user$ = this.activatedRoute.data.pipe(
    map((data) => data["user"]),
    map((user) => ({
      ...user,
      type: isPrivateUser(user, requiredKeys) ? "private" : "public",
    })),
  );
}

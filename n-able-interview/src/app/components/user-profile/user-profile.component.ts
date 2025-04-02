import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "app-user-profile",
  imports: [AsyncPipe],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent {
  activatedRoute = inject(ActivatedRoute);
  user$ = this.activatedRoute.data.pipe(map((data) => data["user"]));
}

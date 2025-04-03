import { Component, inject } from "@angular/core";
import { AsyncPipe, TitleCasePipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: "app-user-profile",
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: "./user-profile.component.html",
  styleUrl: "./user-profile.component.css",
})
export class UserProfileComponent {
  private activatedRoute = inject(ActivatedRoute);
  userWithRepositories$ = this.activatedRoute.data.pipe(
    map((data) => data["userWithRepositories"]),
  );
}

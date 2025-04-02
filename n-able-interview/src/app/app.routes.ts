import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users/:username", component: UserProfileComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

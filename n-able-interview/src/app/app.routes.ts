import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { userResolver } from "./resolvers/user.resolver";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "users/:username",
    component: UserProfileComponent,
    resolve: {
      userWithRepositories: userResolver,
    },
  },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

import { NotFoundComponent } from "./not-found/not-found.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { DetailsComponent } from "./details/details.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "/recipes", pathMatch: "full" },
  { path: "recipes", component: RecipesComponent },
  { path: "recipes/:id", component: DetailsComponent },
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

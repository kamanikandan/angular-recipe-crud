import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { RecipeService } from "./../recipe.service";
import { Recipe } from "./../model/recipe.model";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.scss"]
})
export class DetailsComponent implements OnInit {
  selectedId: string;
  recipe: Recipe;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedId = params.get("id");
      if (this.selectedId != "new") {
        this.recipeService.getRecipe(this.selectedId).subscribe(data => {
          this.recipe = data;
        });
      } else {
        this.recipe = {};
      }
    });
  }

  submit(f) {
    if (this.selectedId != "new") {
      this.recipeService.updateRecipe(this.recipe).subscribe(data => {
        this.router.navigate(["/"]);
      });
    } else {
      this.recipeService.createRecipe(this.recipe).subscribe(data => {
        this.router.navigate(["/"]);
      });
    }
  }
}

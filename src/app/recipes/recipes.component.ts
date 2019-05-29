import { Component, OnInit } from "@angular/core";
import { Recipe } from "../model/recipe.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.scss"]
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  activeId: string;
  activeTag: boolean = true;
  error;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe(
      data => {
        this.recipes = data;
        this.filteredRecipes = data;
      },
      error => {
        this.error = error;
      }
    );
    this.route.paramMap.subscribe(params => {
      this.activeId = params.get("id");
    });
  }

  isSelected(recipe) {
    return recipe._id === this.activeId;
  }

  markFavourite(recipe: Recipe) {
    recipe.isFavourite = !recipe.isFavourite;
    this.recipeService.updateRecipe(recipe).subscribe();
  }

  deleteRecipe(recipe: Recipe) {
    let index = this.recipes.indexOf(recipe);
    this.recipes.splice(index, 1);
    this.recipeService.deleteRecipe(recipe._id).subscribe(data => {
      console.log(data);
    });
  }

  onSearch(e) {
    let searchTerm = e.target.value;
    let regEx = new RegExp(`^${searchTerm}`, "gi");
    this.filteredRecipes = this.recipes.filter(recipe => {
      return recipe.name.match(regEx);
    });
  }

  onTagChange(tag) {
    if (tag === "all") {
      this.activeTag = true;
      this.filteredRecipes = this.recipes;
    } else {
      this.activeTag = false;
      this.filteredRecipes = this.recipes.filter(recipe => {
        return recipe.isFavourite === true;
      });
    }
  }
}

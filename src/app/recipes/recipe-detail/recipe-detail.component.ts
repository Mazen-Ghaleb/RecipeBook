import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  currentRecipeId: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.currentRecipeId = +params['id'];
        this.currentRecipe = this.recipeService.getRecipe(this.currentRecipeId);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.currentRecipe.ingredients);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.currentRecipeId);
    this.router.navigate(['/recipes']);
  }
}

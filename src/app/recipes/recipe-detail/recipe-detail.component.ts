import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.currentRecipe = this.recipeService.getRecipe(+params['id']);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.currentRecipe.ingredients);
  }
}

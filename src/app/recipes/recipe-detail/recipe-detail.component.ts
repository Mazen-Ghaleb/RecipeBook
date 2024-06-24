import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';

import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  currentRecipe: Recipe;
  currentRecipeId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map((params) => {
          return +params['id'];
        }),
        switchMap((id) => {
          this.currentRecipeId = id;
          return this.store.select('recipes');
        }),
        map((recipesState) => {
          return recipesState.recipes.find(
            (recipe, index) => index === this.currentRecipeId
          );
        })
      )
      .subscribe((recipe) => {
        this.currentRecipe = recipe;
      });
  }

  onAddToShoppingList() {
    // this.recipeService.addIngredientsToShoppingList(
    //   this.currentRecipe.ingredients
    // );
    this.store.dispatch(
      ShoppingListActions.addIngredients({
        ingredients: this.currentRecipe.ingredients,
      })
    );
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.currentRecipeId);
    this.store.dispatch(
      RecipeActions.deleteRecipe({ index: this.currentRecipeId })
    );
    this.router.navigate(['/recipes']);
  }
}

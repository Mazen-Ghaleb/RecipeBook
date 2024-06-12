import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.module';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  //   private recipes: Recipe[] = [
  //     new Recipe(
  //       'Combo Meal',
  //       'This is simply a test',
  //       'https://pimagerepository.churchstexaschicken.com/6c59cf84-752d-455c-8a7b-026d8275716e.jpg',
  //       [new Ingredient('Chicken', 3), new Ingredient('French Fries', 20)]
  //     ),
  //     new Recipe(
  //       'BURGER',
  //       'This is simply a test',
  //       'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
  //       [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //     ),
  //     new Recipe(
  //       'BURGER',
  //       'This is simply a test',
  //       'https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg',
  //       []
  //     ),
  //   ];

  private recipes: Recipe[] = [];

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    // return a copy of the array
    return this.recipes.slice();
  }

  getNumberOfRecipes() {
    return this.recipes.length;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.store.dispatch(ShoppingListActions.addIngredients({ ingredients }));
    // this.shoppingListService.onAddIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}

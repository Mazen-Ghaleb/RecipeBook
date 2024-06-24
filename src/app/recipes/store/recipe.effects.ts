import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';

import * as RecipeActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  fetchRecipes = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.fetchRecipes),
      switchMap((fetchAction) => {
        return this.http.get<Recipe[]>(
          'https://ng-complete-guide-68f37-default-rtdb.firebaseio.com/recipes.json'
        );
      }),
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      map((recipes) => {
        return RecipeActions.setRecipes({ recipes });
      })
    )
  );

  storeRecipes = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RecipeActions.storeRecipes),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipeState]) => {
          return this.http.put(
            'https://ng-complete-guide-68f37-default-rtdb.firebaseio.com/recipes.json',
            recipeState.recipes
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}

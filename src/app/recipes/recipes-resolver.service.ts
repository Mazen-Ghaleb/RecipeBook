import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipeActions from './store/recipe.actions';
import { Observable, map, of, switchMap, take } from 'rxjs';

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(RecipeActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.setRecipes),
            take(1)
          ) as Observable<Recipe[]>;
        } else {
          return of(recipes) as Observable<Recipe[]>;
        }
      })
    );
  }
}

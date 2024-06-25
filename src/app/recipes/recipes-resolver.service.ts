import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
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
    private actions$: Actions,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Recipe[]> {
    const id = +route.params['id']; // Assuming 'id' is a number

    return this.store.select('recipes').pipe(
      take(1),
      map((recipesState) => recipesState.recipes),
      switchMap((recipes) => {
        if (recipes.length === 0) {
          this.store.dispatch(RecipeActions.fetchRecipes());
          return this.actions$.pipe(
            ofType(RecipeActions.setRecipes),
            take(1),
            map((fetchedRecipes) => {
              // Check if id is valid after fetching
              if (id < 0 || id >= fetchedRecipes.recipes.length) {
                this.router.navigate(['/recipes']); // Redirect if out of bounds
              }
              return fetchedRecipes.recipes;
            })
          );
        } else {
          // Check if id is valid without fetching
          if (id < 0 || id >= recipes.length) {
            this.router.navigate(['/recipes']); // Redirect if out of bounds
          }
          return of(recipes);
        }
      })
    );
  }
}

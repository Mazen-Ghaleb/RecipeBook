import { createAction, props } from '@ngrx/store';
import { Recipe } from '../recipe.model';

const SET_RECIPES = '[Recipes] Set Recipes';
const STORE_RECIPES = '[Recipes] Store Recipes';
const FETCH_RECIPES = '[Recipes] Fetch Recipes';
const ADD_RECIPE = '[Recipes] Add Recipe';
const UPDATE_RECIPE = '[Recipes] Update Recipe';
const DELETE_RECIPE = '[Recipes] Delete Recipe';

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
);
export const storeRecipes = createAction(STORE_RECIPES);
export const fetchRecipes = createAction(FETCH_RECIPES);
export const addRecipe = createAction(ADD_RECIPE, props<{ recipe: Recipe }>());
export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ index: number; newRecipe: Recipe }>()
);
export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ index: number }>()
);

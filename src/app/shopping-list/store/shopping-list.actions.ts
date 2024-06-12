import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.module';

const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
const START_EDIT = '[Shopping List] Start Edit';
const STOP_EDIT = '[Shopping List] Stop Edit';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredient = createAction(
  UPDATE_INGREDIENT,
  props<{ ingredient: Ingredient }>()
);

export const deleteIngredient = createAction(DELETE_INGREDIENT);

export const startEdit = createAction(START_EDIT, props<{ index: number }>());

export const stopEdit = createAction(STOP_EDIT);

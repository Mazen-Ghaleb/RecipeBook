import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.module';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngrident: Ingredient;
  editedIngridentIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngrident: null,
  editedIngridentIndex: -1,
};
export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  })),
  on(ShoppingListActions.addIngredients, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, ...action.ingredients],
  })),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIngridentIndex];
    const updatedIngredient = {
      ...ingredient,
      ...action.ingredient,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngridentIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngrident: null,
      editedIngridentIndex: -1,
    };
  }),
  on(ShoppingListActions.deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((ig, igIndex) => {
      return igIndex !== state.editedIngridentIndex;
    }),
    editedIngrident: null,
    editedIngridentIndex: -1,
  })),
  on(ShoppingListActions.startEdit, (state, action) => ({
    ...state,
    editedIngridentIndex: action.index,
    editedIngrident: { ...state.ingredients[action.index] },
  })),
  on(ShoppingListActions.stopEdit, (state) => ({
    ...state,
    editedIngrident: null,
    editedIngridentIndex: -1,
  }))
);

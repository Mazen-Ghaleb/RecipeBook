import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.module';
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngrident: Ingredient;
  editedIngridentIndex: number;
}

const initialState: State = {
  // ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  ingredients: [],
  editedIngrident: null,
  editedIngridentIndex: -1,
};

function addIngredient(state: State, newIngredient: Ingredient) {
  const ingredient = state.ingredients.find(
    (ig) => ig.name === newIngredient.name
  );
  if (ingredient) {
    const updatedIngredient = {
      ...ingredient,
      amount: ingredient.amount + newIngredient.amount,
    };
    const ingredients = [...state.ingredients];
    ingredients[state.ingredients.indexOf(ingredient)] = updatedIngredient;
    return {
      ...state,
      ingredients,
    };
  }
  return {
    ...state,
    ingredients: [...state.ingredients, newIngredient],
  };
}

export const shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, action) => {
    return addIngredient(state, action.ingredient);
  }),
  on(ShoppingListActions.addIngredients, (state, action) => {
    for (const ingredient of action.ingredients) {
      state = addIngredient(state, ingredient);
    }
    return state;
  }),
  on(ShoppingListActions.updateIngredient, (state, action) => {
    const ingredient = state.ingredients[state.editedIngridentIndex];
    const existingIngredient = state.ingredients.find(
      (ig) => ig.name === action.ingredient.name
    );
    if (
      existingIngredient &&
      state.ingredients.indexOf(existingIngredient) !==
        state.editedIngridentIndex
    ) {
      const totalAmount = existingIngredient.amount + action.ingredient.amount;
      const updatedIngredient = {
        ...existingIngredient,
        ...action.ingredient,
        amount: totalAmount,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngridentIndex] = updatedIngredient;
      updatedIngredients.splice(
        state.ingredients.indexOf(existingIngredient),
        1
      );

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngrident: null,
        editedIngridentIndex: -1,
      };
    } else {
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
    }
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

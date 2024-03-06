import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.module';

export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
      ];

    private addIngredient(ingredient: Ingredient) {
        const index = this.ingredients.findIndex(ing => ing.name === ingredient.name);
        if (index === -1) {
            this.ingredients.push(ingredient);
        } else {
            this.ingredients[index].amount += ingredient.amount;
        }
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }
    getIngredients() {
        return this.ingredients.slice();
    }

    onAddIngredient(ingredient: Ingredient) {
        this.addIngredient(ingredient);
        // this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    onAddIngredients(ingredients: Ingredient[]) {
        for (let ingredient of ingredients) {
            this.addIngredient(ingredient);
        }
        // this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}
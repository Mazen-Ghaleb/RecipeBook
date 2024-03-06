import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/ingredient.module';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientsSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}
  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }
  ngOnDestroy(): void {
    this.ingredientsSub.unsubscribe();
  }

  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);
  }
}

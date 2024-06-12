import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.module';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<fromShoppingList.AppState>) {}
  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
  }
  ngOnDestroy(): void {}

  onEditItem(index: number) {
    this.store.dispatch(ShoppingListActions.startEdit({ index }));
  }
}

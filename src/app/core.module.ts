import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { RecipeService } from './recipes/recipe.service';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { DataStorageService } from './shared/data-storage.service';
import { RecipeResolverService } from './recipes/recipes-resolver.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  providers: [
    AuthGuard,
    AuthService,
    DataStorageService,
    RecipeService,
    RecipeResolverService,
    ShoppingListService,
    AppRoutingModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  exports: [],
})
export class CoreModule {}

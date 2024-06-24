import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login_start),
      switchMap((authData) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              environment.firebaseAPIKey,
            {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            map((resData) => {
              const expirationDate: Date = new Date(
                new Date().getTime() + +resData.expiresIn * 1000
              );
              return AuthActions.login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate,
              });
            }),
            catchError((errorRes) => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                return of(AuthActions.login_fail({ errorMessage }));
              }
              switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'This email already exists';
                  break;
                case 'OPERATION_NOT_ALLOWED':
                  errorMessage =
                    'Password sign-in is disabled for this project';
                  break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                  errorMessage =
                    'We have blocked all requests from this device due to unusual activity. Try again later.';
                  break;
                case 'EMAIL_NOT_FOUND':
                  errorMessage = 'This email does not exist';
                  break;
                case 'INVALID_PASSWORD':
                  errorMessage = 'This password is not correct';
                  break;
                case 'USER_DISABLED':
                  errorMessage = 'This user has been disabled';
                  break;
                case 'INVALID_LOGIN_CREDENTIALS':
                  errorMessage = 'Invalid login credentials';
                  break;
              }
              return of(AuthActions.login_fail({ errorMessage }));
            })
          );
      })
    )
  );

  authSuccess = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router // private store: Store<fromApp.AppState>
  ) {}
}

import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginStart, AuthActions.signupStart, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.authenticateSuccess, (state, action) => ({
    ...state,
    user: new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    ),
    authError: null,
    loading: false,
  })),
  on(AuthActions.authenticateFail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  })),
  on(AuthActions.clearError, (state) => ({
    ...state,
    authError: null,
  }))
);

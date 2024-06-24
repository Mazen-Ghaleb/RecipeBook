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
  on(AuthActions.login, (state, action) => ({
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
  on(AuthActions.login_start, (state) => ({
    ...state,
    authError: null,
    loading: true,
  })),
  on(AuthActions.login_fail, (state, action) => ({
    ...state,
    user: null,
    authError: action.errorMessage,
    loading: false,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  }))
);

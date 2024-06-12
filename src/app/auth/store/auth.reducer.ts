import { createReducer, on } from '@ngrx/store';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
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
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
  }))
);

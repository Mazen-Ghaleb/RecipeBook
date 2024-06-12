import { createAction, props } from '@ngrx/store';

const LOGIN = '[Auth] Login';
const LOGOUT = '[Auth] Logout';

export const login = createAction(
  LOGIN,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const logout = createAction(LOGOUT);

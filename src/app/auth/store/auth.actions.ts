import { createAction, props } from '@ngrx/store';

const LOGIN = '[Auth] Login';
const LOGIN_START = '[Auth] Login Start';
const LOGIN_FAIL = '[Auth] Login Fail';
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

export const login_start = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const login_fail = createAction(
  LOGIN_FAIL,
  props<{
    errorMessage: string;
  }>()
);

export const logout = createAction(LOGOUT);

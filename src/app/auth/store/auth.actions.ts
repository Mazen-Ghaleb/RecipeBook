import { createAction, props } from '@ngrx/store';

const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
const SIGNUP_START = '[Auth] Signup Start';
const LOGIN_START = '[Auth] Login Start';
const AUTO_LOGIN = '[Auth] Auto Login';
const LOGOUT = '[Auth] Logout';
const CLEAR_ERROR = '[Auth] Clear Error';

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
    redirect: boolean;
  }>()
);
export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{
    errorMessage: string;
  }>()
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{
    email: string;
    password: string;
  }>()
);

export const loginStart = createAction(
  LOGIN_START,
  props<{
    email: string;
    password: string;
  }>()
);
export const autoLogin = createAction(AUTO_LOGIN);

export const logout = createAction(LOGOUT);
export const clearError = createAction(CLEAR_ERROR);

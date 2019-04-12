import { Action } from '@ngrx/store';

import { User } from '@insight/shared-model';

export enum AppActionTypes {
  InitApp = '[App] Init',

  Login = '[App] Login',
  SetUser = '[App] Set User',
  LoginError = '[App] Login Error',

  Logout = '[App] Logout',
  LogoutSuccess = '[App] Logout Success',
  LogoutError = '[App] Logout Error'
}

export class InitApp implements Action {
  readonly type = AppActionTypes.InitApp;
}

export class Login implements Action {
  readonly type = AppActionTypes.Login;
}

export class SetUser implements Action {
  readonly type = AppActionTypes.SetUser;
  constructor(public payload: User) {}
}

export class LoginError implements Action {
  readonly type = AppActionTypes.LoginError;
  constructor(public  payload: any) {}
}

export class Logout implements Action {
  readonly type = AppActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = AppActionTypes.LogoutSuccess;
}

export class LogoutError implements Action {
  readonly type = AppActionTypes.LogoutError;
  constructor(public  payload: any) {}
}

export type AppAction = InitApp
  | Login
  | SetUser
  | LoginError

  | Logout
  | LogoutError
  | LogoutSuccess;

import { Action } from '@ngrx/store';

import { UserModel } from '@insight/shared-model';

export enum AppActionTypes {
  InitApp = '[App] Init',

  Login = '[App] Login',
  SetUser = '[App] SetUser',
  LoginError = '[App] LoginError',

  Logout = '[App] Logout',
  LogoutSuccess = '[App] LogoutSuccess',
  LogoutError = '[App] LogoutError'
}

export class InitApp implements Action {
  readonly type = AppActionTypes.InitApp;
}

export class Login implements Action {
  readonly type = AppActionTypes.Login;
}

export class SetUser implements Action {
  readonly type = AppActionTypes.SetUser;
  constructor(public payload: UserModel) {}
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

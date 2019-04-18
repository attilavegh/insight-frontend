import { Action } from '@ngrx/store';

import { User } from '@insight/shared-model';

export enum AppActionTypes {
  InitApp = '[App] Init',

  Login = '[App] Login',
  SetUser = '[App] Set User',

  Logout = '[App] Logout',
  LogoutSuccess = '[App] Logout Success',

  AuthError = '[App] Auth Error'
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

export class Logout implements Action {
  readonly type = AppActionTypes.Logout;
}

export class LogoutSuccess implements Action {
  readonly type = AppActionTypes.LogoutSuccess;
}

export class AuthError implements Action {
  readonly type = AppActionTypes.AuthError;
  constructor(public  payload: any) {}
}

export type AppAction = InitApp
  | Login
  | SetUser

  | Logout
  | AuthError
  | LogoutSuccess;

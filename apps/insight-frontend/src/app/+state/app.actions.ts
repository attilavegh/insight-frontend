import { Action } from '@ngrx/store';

import { Insight, User } from '@insight/shared-model';

export enum AppActionTypes {
  InitUser = '[App] Init User',

  InitNotification = '[App] Init Notification',
  NewNotification = '[App] New Notification',
  NotificationError = '[App] Notification Error',

  Login = '[App] Login',
  SetUser = '[App] Set User',

  Logout = '[App] Logout',
  LogoutSuccess = '[App] Logout Success',

  AuthError = '[App] Auth Error'
}

export class InitUser implements Action {
  readonly type = AppActionTypes.InitUser;
}

export class InitNotification implements Action {
  readonly type = AppActionTypes.InitNotification;
}

export class NewNotification implements Action {
  readonly type = AppActionTypes.NewNotification;
  constructor(public payload: Insight) {}
}

export class NotificationError implements Action {
  readonly type = AppActionTypes.NotificationError;
  constructor(public payload: any) {}
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

export type AppAction = InitUser
  | InitNotification
  | NewNotification
  | NotificationError
  | Login
  | SetUser

  | Logout
  | AuthError
  | LogoutSuccess;

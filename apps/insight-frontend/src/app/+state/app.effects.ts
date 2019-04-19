import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AuthenticationService, authTokenName, OneTimeAuthCode, refreshTokenName, AuthToken } from '@insight/authentication';
import { Insight, User } from '@insight/shared-model';
import { NotificationService } from '@insight/shared-services';

import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { AppPartialState } from './app.reducer';
import { AppFacade } from './app.facade';
import {
  AppActionTypes,
  Login,
  SetUser,
  Logout,
  AuthError, LogoutSuccess, InitUser, InitNotification, NewNotification, NotificationError
} from './app.actions';


@Injectable()
export class AppEffects {

  @Effect() initUser$ = this.dataPersistence.fetch(AppActionTypes.InitUser, {
    run: () => {
      return this.router.events.pipe(
        take(1),
        map(() => this.authentication.getUser(localStorage.getItem(authTokenName))),
        filter((user: User) => !!user),
        map((user: User) => new SetUser(user))
      );
    },

    onError: (action: InitUser, error) => {
      console.error('Error:', error);
      return new Logout();
    }
  });

  @Effect() initNotification$ = this.dataPersistence.fetch(AppActionTypes.InitNotification, {
    run: () => {
      return this.appFacade.user$.pipe(
        filter((user: User) => !!user),
        take(1),
        switchMap((user: User) => this.notificationService.connect(user)),
        map((insight: Insight) => new NewNotification(insight))
      );
    },

    onError: (action: InitNotification, error) => {
      console.error('Error:', error);
      return new NotificationError(error);
    }
  });

  @Effect({ dispatch: false }) newNotification$ = this.dataPersistence.fetch(AppActionTypes.NewNotification, {
    run: (action: NewNotification) => {
      this.notificationService.create(action.payload);
    }
  });

  @Effect() login$ = this.dataPersistence.fetch(AppActionTypes.Login, {
    run: () => {
      return this.authentication.login().pipe(
        switchMap((accessCode: OneTimeAuthCode) => this.authentication.authenticate(accessCode)),
        tap((authToken: AuthToken) => this.saveTokens(authToken)),
        map((authToken: AuthToken) => this.authentication.getUser(authToken.idToken)),
        tap(() => this.router.navigate(['/'])),
        map((user: User) => new SetUser(user))
      );
    },

    onError: (action: Login, error) => {
      console.error('Error:', error);
      return new AuthError(error);
    }
  });

  @Effect() logout$ = this.dataPersistence.fetch(AppActionTypes.Logout, {
    run: () => {
      return this.actions$.pipe(
        take(1),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/login']);
        }),
        map(() => new LogoutSuccess())
      );
    },

    onError: (action: Logout, error) => {
      console.error('Error:', error);
      return new AuthError(error);
    }
  });

  @Effect({ dispatch: false }) authError$ = this.dataPersistence.fetch(AppActionTypes.AuthError, {
    run: () => {
      localStorage.clear();
    }
  });

  private saveTokens(authToken: AuthToken) {
    localStorage.setItem(authTokenName, authToken.idToken);
    localStorage.setItem(refreshTokenName, authToken.refreshToken);
  }

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private actions$: Actions,
    private appFacade: AppFacade,
    private notificationService: NotificationService,
    private dataPersistence: DataPersistence<AppPartialState>
  ) {}
}

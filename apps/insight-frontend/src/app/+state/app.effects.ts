import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AuthenticationService, authTokenName, OneTimeAuthCode, refreshTokenName, AuthToken } from '@insight/authentication';
import { User } from '@insight/shared-model';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { AppPartialState } from './app.reducer';
import {
  AppActionTypes,
  Login,
  SetUser,
  Logout,
  AuthError, LogoutSuccess
} from './app.actions';

@Injectable()
export class AppEffects {

  @Effect() initApp$ = this.dataPersistence.fetch(AppActionTypes.InitApp, {
    run: () => {
      return this.router.events.pipe(
        take(1),
        map(() => this.authentication.getUser(localStorage.getItem(authTokenName))),
        map((user: User) => new SetUser(user))
      );
    },

    onError: (action: Logout, error) => {
      console.error('Error:', error);
      return new Logout();
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

  @Effect({dispatch: false}) authError$ = this.dataPersistence.fetch(AppActionTypes.AuthError, {
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
    private dataPersistence: DataPersistence<AppPartialState>
  ) {}
}

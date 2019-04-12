import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AuthenticationService } from '@insight/authentication';
import { User } from '@insight/shared-model';

import { map, switchMap, take, tap } from 'rxjs/operators';

import { AppPartialState } from './app.reducer';
import {
  AppActionTypes,
  Login,
  LoginError,
  SetUser,
  Logout,
  LogoutError, LogoutSuccess
} from './app.actions';

import { SocialUser } from 'angularx-social-login';

@Injectable()
export class AppEffects {

  @Effect() initApp$ = this.dataPersistence.fetch(AppActionTypes.InitApp, {
    run: () => {
      return this.router.events.pipe(
        take(1),
        switchMap(() => this.authentication.getUser()),
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
        tap((user: SocialUser) => localStorage.setItem('token', user.idToken)),
        switchMap((user: SocialUser) => this.authentication.verifyUser(user)),
        map((user: User) => new SetUser(user)),
        tap(() => this.router.navigate(['/']))
      );
    },

    onError: (action: Login, error) => {
      console.error('Error:', error);
      return new LoginError(error);
    }
  });

  @Effect({dispatch: false}) loginError$ = this.dataPersistence.fetch(AppActionTypes.LoginError, {
    run: () => {
      localStorage.clear();
    }
  });

  @Effect() logout$ = this.dataPersistence.fetch(AppActionTypes.Logout, {
    run: () => {
      return this.authentication.logout().pipe(
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/login']);
        }),
        map(() => new LogoutSuccess())
      );
    },

    onError: (action: Logout, error) => {
      console.error('Error:', error);
      return new LogoutError(error);
    }
  });

  @Effect({dispatch: false}) logoutError$ = this.dataPersistence.fetch(AppActionTypes.LogoutError, {
    run: () => {
      localStorage.clear();
    }
  });

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private actions$: Actions,
    private dataPersistence: DataPersistence<AppPartialState>
  ) {}
}

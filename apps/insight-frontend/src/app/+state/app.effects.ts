import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { AuthenticationService, AuthToken, authTokenName, OneTimeAuthCode, refreshTokenName } from '@insight/authentication';
import { AssignmentResult, Insight, notificationMessage, NotificationType, User } from '@insight/shared-model';
import {
  AnalyticsService,
  BrowserNotificationService,
  DeviceTypeDetectorService,
  NotificationService,
  SplitterService
} from '@insight/shared-services';

import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { iif, of } from 'rxjs';

import { AppPartialState } from './app.reducer';
import { AppFacade } from './app.facade';
import {
  AppActionTypes,
  AuthError, GetAssignmentsError, GetAssignmentsSuccess,
  InitNotification,
  InitUser,
  Login,
  Logout,
  LogoutSuccess,
  NewNotification,
  NotificationError,
  SetUser
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
        switchMap((user: User) => this.browserNotification.connect(user)),
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
      this.browserNotification.create(action.payload);
    }
  });

  @Effect() login$ = this.dataPersistence.fetch(AppActionTypes.Login, {
    run: () => {
      return this.authentication.login().pipe(
        take(1),
        switchMap((accessCode: OneTimeAuthCode) => this.authentication.authenticate(accessCode)),
        map((authToken: AuthToken) => this.onLoginSuccess(authToken))
      );
    },

    onError: (action: Login, error) => {
      console.error('Error:', error);
      this.notification.show(notificationMessage.generalError, NotificationType.ERROR);
      return new AuthError(error);
    }
  });

  @Effect() logout$ = this.dataPersistence.fetch(AppActionTypes.Logout, {
    run: () => {
      localStorage.clear();
      window.location.reload();
      return new LogoutSuccess();
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

  @Effect({ dispatch: false }) setUser$ = this.dataPersistence.fetch(AppActionTypes.SetUser, {
    run: (action: SetUser) => {
      this.analytics.setUser(action.payload.googleId);
    }
  });

  @Effect() getAssignments$ = this.dataPersistence.fetch(AppActionTypes.GetAssignments, {
    run: () => {
      return this.appFacade.user$.pipe(
        filter((user: User) => !!user),
        take(1),
        mergeMap((user: User) => iif(() => this.splitter.isMocked(),
          of(this.splitter.parseMockedData()),
          this.splitter.assign(user.googleId, this.deviceTypeDetector.detect()),
        )),
        map((result: AssignmentResult[]) => new GetAssignmentsSuccess(result))
      );
    },

    onError: (action: Logout, error) => {
      console.error('Error:', error);
      return new GetAssignmentsError(error);
    }
  });

  private onLoginSuccess(authToken: AuthToken) {
    const user = this.authentication.getUser(authToken.idToken);

    localStorage.setItem(authTokenName, authToken.idToken);
    localStorage.setItem(refreshTokenName, authToken.refreshToken);
    localStorage.setItem('userImg', user.imageUrl);

    this.ngZone.run(() => this.router.navigate(['/']));

    return new SetUser(user);
  }

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private actions$: Actions,
    private appFacade: AppFacade,
    private ngZone: NgZone,
    private notification: NotificationService,
    private analytics: AnalyticsService,
    private browserNotification: BrowserNotificationService,
    private deviceTypeDetector: DeviceTypeDetectorService,
    private splitter: SplitterService,
    private dataPersistence: DataPersistence<AppPartialState>
  ) {}
}

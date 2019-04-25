import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AppPartialState } from './app.reducer';
import { appQuery } from './app.selectors';
import { InitNotification, InitUser, Login, Logout } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {
  user$ = this.store.pipe(select(appQuery.getUser));
  loading$ = this.store.pipe(select(appQuery.getLoading));
  error$ = this.store.pipe(select(appQuery.getError));

  constructor(private store: Store<AppPartialState>) {}

  initApp() {
    this.store.dispatch(new InitUser());
  }

  initNotification() {
    this.store.dispatch(new InitNotification());
  }

  login() {
    this.store.dispatch(new Login());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}

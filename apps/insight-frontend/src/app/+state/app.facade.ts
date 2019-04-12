import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AppPartialState } from './app.reducer';
import { appQuery } from './app.selectors';
import { InitApp, Login, Logout } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {
  user$ = this.store.pipe(select(appQuery.getUser));
  error$ = this.store.pipe(select(appQuery.getError));

  constructor(private store: Store<AppPartialState>) {}

  initApp() {
    this.store.dispatch(new InitApp());
  }

  login() {
    this.store.dispatch(new Login());
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}

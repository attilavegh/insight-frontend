import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AssignmentResult } from '@insight/shared-model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppPartialState } from './app.reducer';
import { appQuery } from './app.selectors';
import { GetAssignments, InitNotification, InitUser, Login, Logout } from './app.actions';

@Injectable({
  providedIn: 'root'
})
export class AppFacade {
  user$ = this.store.pipe(select(appQuery.getUser));
  loading$ = this.store.pipe(select(appQuery.getLoading));

  activeUrl$ = this.store.pipe(select(appQuery.getActiveUrl));

  constructor(private store: Store<AppPartialState>) {}

  initUser() {
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

  getAssignments() {
    this.store.dispatch(new GetAssignments());
  }

  selectAssignment(name: string): Observable<AssignmentResult> {
    return this.store.pipe(
      select(appQuery.getAssignments),
      map(assignments => assignments.filter(assignment => assignment.experimentName === name)),
      map(assignments => assignments[0])
    );
  }
}

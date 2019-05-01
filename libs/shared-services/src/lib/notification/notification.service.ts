import { Injectable } from '@angular/core';

import { NotificationPayload, NotificationType } from '@insight/shared-model';

import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface NotificationServiceShape {
  show(message: string, type: NotificationType, duration: number);
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements NotificationServiceShape {

  private _payload$ = new Subject<NotificationPayload>();
  private _display$ = new BehaviorSubject<boolean>(false);

  private closeTimer;

  constructor() {}

  show(message: string, type: NotificationType = NotificationType.SUCCESS, duration: number = 2000) {
    this._payload$.next({ message, type });
    this._display$.next(true);

    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => this.close(), duration);
  }

  private close() {
    this._display$.next(false);
  }

  get payload$(): Observable<NotificationPayload> {
    return this._payload$.asObservable();
  }

  get display$() {
    return this._display$.asObservable();
  }
}

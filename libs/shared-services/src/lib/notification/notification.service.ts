import { Inject, Injectable } from '@angular/core';

import { environmentToken } from '@insight/environment';
import { Insight, User } from '@insight/shared-model';

import { Observable } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export interface NotificationServiceShape {
  connect(user: User): Observable<Insight>;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService implements NotificationServiceShape {

  readonly isNotificationSupported = !!('Notification' in window);

  constructor(@Inject(environmentToken) private environment: string) {}

  connect(user: User): Observable<Insight> {
    const websocket = new SockJS(`${this.environment}/ws`);
    const client = Stomp.over(websocket);

    return new Observable(observer => {
      if (!this.isNotificationSupported) {
          observer.complete();
      }

      this.requestPermission();
      client.debug = null;

      client.connect({}, () => {
        client.subscribe(`/notification/${user.googleId}`, (notification) => {
          observer.next(JSON.parse(notification.body) as Insight);
        });
      });
    });
  }

  create(insight: Insight) {
    const notificationOptions: NotificationOptions = {
      body: 'View your new insight!',
      icon: insight.sender.imageUrl
    };

    const notification = new Notification(insight.sender.fullName, notificationOptions);
    notification.onclick = () => window.open('https://elte-insight.firebaseapp.com/insights', '_blank');
  }

  private requestPermission() {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
}

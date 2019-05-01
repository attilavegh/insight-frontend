import { Observable, of } from 'rxjs';

import { Insight, User } from '@insight/shared-model';

import { BrowserNotificationServiceShape } from './browser-notification.service';

export class BrowserNotificationServiceMock implements BrowserNotificationServiceShape {
  connect(user: User): Observable<Insight> {
    return of(null);
  }
}

import { Observable, of } from 'rxjs';

import { Insight, User } from '@insight/shared-model';

import { NotificationServiceShape } from './notification.service';

export class NotificationServiceMock implements NotificationServiceShape {
  connect(user: User): Observable<Insight> {
    return of(null);
  }
}

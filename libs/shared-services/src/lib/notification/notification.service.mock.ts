import { NotificationType } from '@insight/shared-model';

import { NotificationServiceShape } from './notification.service';

export class NotificationServiceMock implements NotificationServiceShape {
  show(message: string, type: NotificationType, duration: number) {
  }
}

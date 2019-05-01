import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { NotificationPayload, NotificationType } from '@insight/shared-model';

@Component({
  selector: 'insight-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationComponent implements OnInit {

  @Input() payload: NotificationPayload;
  @Input() shouldDisplay: boolean;

  constructor() {}

  ngOnInit() {}

  get isSuccessType() {
    return this.payload && this.payload.type === NotificationType.SUCCESS;
  }

  get isErrorType() {
    return this.payload && this.payload.type === NotificationType.ERROR;
  }
}

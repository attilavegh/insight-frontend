import { Component, Input } from '@angular/core';

import { InsightCategory, Insight } from '@insight/shared-model';

@Component({
  selector: 'insight-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent {

  @Input() message: Insight;
  @Input() category: InsightCategory;

  constructor() {}

  get getDisplayedUser() {
    return this.category === InsightCategory.RECEIVED ? this.message.sender : this.message.receiver;
  }
}

import { Component, OnInit } from '@angular/core';

import { MessageFilterType } from '../../../../shared/model/message/message-filter.model';
import { MessageType } from '../../../../shared/model/message/message-type.model';

@Component({
  selector: 'insight-my-insight',
  templateUrl: './my-insight.component.html',
  styleUrls: ['./my-insight.component.scss']
})
export class MyInsightComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  onMessageTypeChange(type: MessageType) {
    console.log(type);
  }

  onFilterChange(filter: MessageFilterType) {
    console.log(filter);
  }
}

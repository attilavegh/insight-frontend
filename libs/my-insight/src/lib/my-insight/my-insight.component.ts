import { Component, OnInit } from '@angular/core';

import { MessageFilterType, MessageType } from '@insight/shared-model';

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

import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InsightFilterModel, InsightFilterType } from '@insight/shared-model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'insight-message-filter',
  templateUrl: './message-filter.component.html',
  styleUrls: ['./message-filter.component.scss']
})
export class MessageFilterComponent {

  @Input() filterOptions: InsightFilterModel[];
  @Input() selectedFilter: InsightFilterModel;

  @Output() filterChange = new EventEmitter<InsightFilterModel>();

  isFocused = false;

  constructor() {}

  onFilterSelect(filter: InsightFilterModel) {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
  }

  onClick() {
    this.isFocused = !this.isFocused;
  }

  onBlur() {
    this.isFocused = false;
  }

  get isDefaultFilter() {
    return this.selectedFilter && this.selectedFilter.value === InsightFilterType.ALL;
  }
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { AssignmentResult, InsightFilterModel, InsightFilterType } from '@insight/shared-model';

@Component({
  selector: 'insight-message-filter',
  templateUrl: './message-filter.component.html',
  styleUrls: ['./message-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageFilterComponent {

  readonly highlightedFilterBucketName = 'highlighted_filter';
  @Input() filterAssignment: AssignmentResult;

  @Input() filterOptions: InsightFilterModel[];
  @Input() selectedFilter: InsightFilterModel;

  @Output() filterChange = new EventEmitter<InsightFilterModel>();

  isFocused = false;

  constructor() {}

  onFilterSelect(filter: InsightFilterModel) {
    this.selectedFilter = filter;
    this.filterChange.emit({...filter, bucketName: this.filterAssignment && this.filterAssignment.bucketName});
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

  get isHighlightedExperiment() {
    return this.filterAssignment && this.filterAssignment.bucketName === this.highlightedFilterBucketName;
  }
}

import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { fromEvent, Subscription, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { MessageFilterModel, MessageFilterType } from '../../../../../shared/model/message/message-filter.model';

@Component({
  selector: 'insight-message-filter',
  templateUrl: './message-filter.component.html',
  styleUrls: ['./message-filter.component.scss']
})
export class MessageFilterComponent implements OnInit, OnDestroy {

  @ViewChild('filter') _filterElement: ElementRef;

  @Output() filterChange = new EventEmitter<MessageFilterType>();

  isFocused = false;
  selectedFilter = MessageFilterType.ALL;

  filterOptions: MessageFilterModel[] = [
    { name: 'All', value: MessageFilterType.ALL },
    { name: 'Last day', value: MessageFilterType.LAST_DAY },
    { name: 'Last month', value: MessageFilterType.LAST_MONTH },
    { name: 'Last 6 months', value: MessageFilterType.LAST_SIX_MONTHS },
    { name: 'Last year', value: MessageFilterType.LAST_YEAR },
  ];

  filterFocusSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.observeFilterFocus();
  }

  ngOnDestroy() {
    this.filterFocusSubscription.unsubscribe();
  }

  onFilterSelect(filter: MessageFilterType) {
    this.selectedFilter = filter;
    this.filterChange.emit(filter);
  }

  private observeFilterFocus() {
    this.filterFocusSubscription = fromEvent(this.filterElement, 'click').pipe(
      tap(() => this.isFocused = !this.isFocused),
      switchMap(() => fromEvent(this.filterElement, 'blur')),
      tap(() => this.isFocused = false)
    ).subscribe();
  }

  get filterElement() {
    return this._filterElement.nativeElement;
  }

  get isDefaultFilter() {
    return this.selectedFilter === MessageFilterType.ALL;
  }
}

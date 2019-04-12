import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { InsightFilterModel } from '@insight/shared-model';

import { MyInsightPartialState } from './my-insight.reducer';
import { myInsightQuery } from './my-insight.selectors';
import {
  ChangeInsightFilter,
  GetReceivedInsights, GetSentInsights,
} from './my-insight.actions';

@Injectable({
  providedIn: 'root'
})
export class MyInsightFacade {
  loaded$ = this.store.pipe(select(myInsightQuery.getLoaded));
  category$ = this.store.pipe(select(myInsightQuery.getCategory));
  displayedInsights$ = this.store.pipe(select(myInsightQuery.getDisplayedInsights));
  filter$ = this.store.pipe(select(myInsightQuery.getFilter));
  receivedInsights$ = this.store.pipe(select(myInsightQuery.getReceivedInsights));
  sentInsights$ = this.store.pipe(select(myInsightQuery.getSentInsights));

  constructor(private store: Store<MyInsightPartialState>) {}

  getReceivedInsights() {
    this.store.dispatch(new GetReceivedInsights());
  }

  getSentInsights() {
    this.store.dispatch(new GetSentInsights());
  }

  changeInsightFilter(filter: InsightFilterModel) {
    this.store.dispatch(new ChangeInsightFilter(filter));
  }
}

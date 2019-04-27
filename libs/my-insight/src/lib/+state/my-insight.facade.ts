import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Insight, InsightFilterModel } from '@insight/shared-model';

import { MyInsightPartialState } from './my-insight.reducer';
import { myInsightQuery } from './my-insight.selectors';
import { ChangeInsightFilter, UpdateSentInsights } from './my-insight.actions';

@Injectable({
  providedIn: 'root'
})
export class MyInsightFacade {
  loading$ = this.store.pipe(select(myInsightQuery.getLoading));
  category$ = this.store.pipe(select(myInsightQuery.getCategory));
  displayedInsights$ = this.store.pipe(select(myInsightQuery.getDisplayedInsights));
  filter$ = this.store.pipe(select(myInsightQuery.getFilter));
  receivedInsights$ = this.store.pipe(select(myInsightQuery.getReceivedInsights));
  sentInsights$ = this.store.pipe(select(myInsightQuery.getSentInsights));

  constructor(private store: Store<MyInsightPartialState>) {}

  changeInsightFilter(filter: InsightFilterModel) {
    this.store.dispatch(new ChangeInsightFilter(filter));
  }

  updateSentInsights(insight: Insight) {
    this.store.dispatch(new UpdateSentInsights(insight));
  }
}

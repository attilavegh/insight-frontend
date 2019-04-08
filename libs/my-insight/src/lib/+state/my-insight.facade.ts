import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { MyInsightPartialState } from './my-insight.reducer';
import { myInsightQuery } from './my-insight.selectors';
import { LoadMyInsight } from './my-insight.actions';

@Injectable()
export class MyInsightFacade {
  loaded$ = this.store.pipe(select(myInsightQuery.getLoaded));
  allMyInsight$ = this.store.pipe(select(myInsightQuery.getAllMyInsight));
  selectedMyInsight$ = this.store.pipe(
    select(myInsightQuery.getSelectedMyInsight)
  );

  constructor(private store: Store<MyInsightPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadMyInsight());
  }
}

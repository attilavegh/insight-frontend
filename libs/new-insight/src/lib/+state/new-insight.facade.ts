import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { NewInsightPartialState } from './new-insight.reducer';
import { newInsightQuery } from './new-insight.selectors';
import { LoadNewInsight } from './new-insight.actions';

@Injectable()
export class NewInsightFacade {
  loaded$ = this.store.pipe(select(newInsightQuery.getLoaded));
  allNewInsight$ = this.store.pipe(select(newInsightQuery.getAllNewInsight));
  selectedNewInsight$ = this.store.pipe(
    select(newInsightQuery.getSelectedNewInsight)
  );

  constructor(private store: Store<NewInsightPartialState>) {}

  loadAll() {
    this.store.dispatch(new LoadNewInsight());
  }
}

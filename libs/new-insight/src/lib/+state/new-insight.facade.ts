import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { InsightFormData } from '@insight/shared-model';

import { NewInsightPartialState } from './new-insight.reducer';
import { newInsightQuery } from './new-insight.selectors';
import { SearchUser, SubmitForm } from './new-insight.actions';

@Injectable({
  providedIn: 'root'
})
export class NewInsightFacade {
  users$ = this.store.pipe(select(newInsightQuery.getUsers));
  searchLoading$ = this.store.pipe(select(newInsightQuery.getSearchLoading));

  constructor(private store: Store<NewInsightPartialState>) {}

  search(nameFragment: string) {
    this.store.dispatch(new SearchUser(nameFragment));
  }

  send(data: Partial<InsightFormData>) {
    this.store.dispatch(new SubmitForm(data));
  }
}

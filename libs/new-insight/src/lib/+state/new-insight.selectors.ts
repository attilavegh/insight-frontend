import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NEW_INSIGHT_FEATURE_KEY, NewInsightState } from './new-insight.reducer';

const getNewInsightState = createFeatureSelector<NewInsightState>(NEW_INSIGHT_FEATURE_KEY);

const getUsers = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.userSearch && state.userSearch.users
);

const getSearchLoading = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.userSearch && state.userSearch.loading
);

const getPending = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.form && state.form.pending
);

const getError = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.error
);

export const newInsightQuery = {
  getUsers,
  getSearchLoading,
  getPending,
  getError
};

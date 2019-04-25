import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MY_INSIGHT_FEATURE_KEY, MyInsightState } from './my-insight.reducer';

const getMyInsightState = createFeatureSelector<MyInsightState>(
  MY_INSIGHT_FEATURE_KEY
);

const getLoading = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.loading
);

const getError = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.error
);

const getReceivedInsights = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.receivedInsights
);

const getSentInsights = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.sentInsights
);

const getCategory = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.category
);

const getDisplayedInsights = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.displayedInsights
);

const getFilter = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.filter
);

export const myInsightQuery = {
  getLoading,
  getError,
  getReceivedInsights,
  getSentInsights,
  getDisplayedInsights,
  getCategory,
  getFilter
};

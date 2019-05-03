import { createFeatureSelector, createSelector } from '@ngrx/store';

import { APP_FEATURE_KEY, AppState } from './app.reducer';

const getAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

const getUser = createSelector(
  getAppState,
  (state: AppState) => state.user
);

const getLoading = createSelector(
  getAppState,
  (state: AppState) => state.loading
);

const getAssignments = createSelector(
  getAppState,
  (state: AppState) => state.assignments
);

export const appQuery = {
  getUser,
  getLoading,
  getAssignments
};

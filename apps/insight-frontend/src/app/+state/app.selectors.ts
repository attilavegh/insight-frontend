import { createFeatureSelector, createSelector } from '@ngrx/store';

import { APP_FEATURE_KEY, AppState } from './app.reducer';

const getAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

const getUser = createSelector(
  getAppState,
  (state: AppState) => state.user
);

const getError = createSelector(
  getAppState,
  (state: AppState) => state.error
);

export const appQuery = {
  getUser,
  getError
};

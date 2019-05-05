import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { APP_FEATURE_KEY, AppState, ROUTER_FEATURE_KEY } from './app.reducer';

const getAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);
const getRouterState = createFeatureSelector<RouterReducerState>(ROUTER_FEATURE_KEY);

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

const getActiveUrl = createSelector(
  getRouterState,
  (state: RouterReducerState) => state.state.url
);

export const appQuery = {
  getUser,
  getLoading,
  getAssignments,

  getActiveUrl
};

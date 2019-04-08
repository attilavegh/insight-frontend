import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NEWINSIGHT_FEATURE_KEY, NewInsightState } from './new-insight.reducer';

// Lookup the 'NewInsight' feature state managed by NgRx
const getNewInsightState = createFeatureSelector<NewInsightState>(
  NEWINSIGHT_FEATURE_KEY
);

const getLoaded = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.loaded
);
const getError = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.error
);

const getAllNewInsight = createSelector(
  getNewInsightState,
  getLoaded,
  (state: NewInsightState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getNewInsightState,
  (state: NewInsightState) => state.selectedId
);
const getSelectedNewInsight = createSelector(
  getAllNewInsight,
  getSelectedId,
  (newInsight, id) => {
    const result = newInsight.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const newInsightQuery = {
  getLoaded,
  getError,
  getAllNewInsight,
  getSelectedNewInsight
};

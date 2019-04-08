import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MYINSIGHT_FEATURE_KEY, MyInsightState } from './my-insight.reducer';

// Lookup the 'MyInsight' feature state managed by NgRx
const getMyInsightState = createFeatureSelector<MyInsightState>(
  MYINSIGHT_FEATURE_KEY
);

const getLoaded = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.loaded
);
const getError = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.error
);

const getAllMyInsight = createSelector(
  getMyInsightState,
  getLoaded,
  (state: MyInsightState, isLoaded) => {
    return isLoaded ? state.list : [];
  }
);
const getSelectedId = createSelector(
  getMyInsightState,
  (state: MyInsightState) => state.selectedId
);
const getSelectedMyInsight = createSelector(
  getAllMyInsight,
  getSelectedId,
  (myInsight, id) => {
    const result = myInsight.find(it => it['id'] === id);
    return result ? Object.assign({}, result) : undefined;
  }
);

export const myInsightQuery = {
  getLoaded,
  getError,
  getAllMyInsight,
  getSelectedMyInsight
};

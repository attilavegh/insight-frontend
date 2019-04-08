import { NewInsightAction, NewInsightActionTypes } from './new-insight.actions';

export const NEWINSIGHT_FEATURE_KEY = 'newInsight';

/**
 * Interface for the 'NewInsight' data used in
 *  - NewInsightState, and
 *  - newInsightReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface NewInsightState {
  list: Entity[]; // list of NewInsight; analogous to a sql normalized table
  selectedId?: string | number; // which NewInsight record has been selected
  loaded: boolean; // has the NewInsight list been loaded
  error?: any; // last none error (if any)
}

export interface NewInsightPartialState {
  readonly [NEWINSIGHT_FEATURE_KEY]: NewInsightState;
}

export const initialState: NewInsightState = {
  list: [],
  loaded: false
};

export function newInsightReducer(
  state: NewInsightState = initialState,
  action: NewInsightAction
): NewInsightState {
  switch (action.type) {
    case NewInsightActionTypes.NewInsightLoaded: {
      state = {
        ...state,
        list: action.payload,
        loaded: true
      };
      break;
    }
  }
  return state;
}

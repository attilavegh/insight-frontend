import { MyInsightAction, MyInsightActionTypes } from './my-insight.actions';

export const MYINSIGHT_FEATURE_KEY = 'myInsight';

/**
 * Interface for the 'MyInsight' data used in
 *  - MyInsightState, and
 *  - myInsightReducer
 *
 *  Note: replace if already defined in another module
 */

/* tslint:disable:no-empty-interface */
export interface Entity {}

export interface MyInsightState {
  list: Entity[]; // list of MyInsight; analogous to a sql normalized table
  selectedId?: string | number; // which MyInsight record has been selected
  loaded: boolean; // has the MyInsight list been loaded
  error?: any; // last none error (if any)
}

export interface MyInsightPartialState {
  readonly [MYINSIGHT_FEATURE_KEY]: MyInsightState;
}

export const initialState: MyInsightState = {
  list: [],
  loaded: false
};

export function myInsightReducer(
  state: MyInsightState = initialState,
  action: MyInsightAction
): MyInsightState {
  switch (action.type) {
    case MyInsightActionTypes.MyInsightLoaded: {
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

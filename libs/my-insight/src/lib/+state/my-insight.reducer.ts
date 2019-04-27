import { defaultFilter, Insight, InsightCategory, InsightFilterModel } from '@insight/shared-model';

import { MyInsightAction, MyInsightActionTypes } from './my-insight.actions';

export const MY_INSIGHT_FEATURE_KEY = 'myInsight';

export interface MyInsightState {
  receivedInsights: Insight[];
  sentInsights: Insight[];
  displayedInsights: Insight[];
  loading: boolean;
  category: InsightCategory;
  filter: InsightFilterModel;
  error?: any;
}

export interface MyInsightPartialState {
  readonly [MY_INSIGHT_FEATURE_KEY]: MyInsightState;
}

export const myInsightsInitialState: MyInsightState = {
  receivedInsights: [],
  sentInsights: [],
  displayedInsights: [],
  loading: false,
  category: InsightCategory.RECEIVED,
  filter: defaultFilter
};

export function myInsightReducer(state: MyInsightState = myInsightsInitialState, action: MyInsightAction): MyInsightState {
  switch (action.type) {
    case MyInsightActionTypes.GetReceivedInsights: {
      state = { ...state, displayedInsights: [], category: InsightCategory.RECEIVED, filter: defaultFilter, loading: true };
      break;
    }
    case MyInsightActionTypes.ReceivedInsightsLoaded: {
      state = { ...state, displayedInsights: action.payload, receivedInsights: action.payload, loading: false };
      break;
    }

    case MyInsightActionTypes.GetSentInsights: {
      state = { ...state, displayedInsights: [], category: InsightCategory.SENT, filter: defaultFilter, loading: true };
      break;
    }
    case MyInsightActionTypes.SentInsightsLoaded: {
      state = { ...state, displayedInsights: action.payload, sentInsights: action.payload, loading: false };
      break;
    }

    case MyInsightActionTypes.InsightLoadError: {
      state = { ...state, error: action.payload, loading: false };
      break;
    }

    case MyInsightActionTypes.UpdateSentInsights: {
      state = { ...state, sentInsights: [action.payload, ...state.sentInsights] };
      break;
    }

    case MyInsightActionTypes.ChangeInsightFilter: {
      state = { ...state, filter: action.payload, loading: true };
      break;
    }
    case MyInsightActionTypes.InsightFilterChanged: {
      state = { ...state, displayedInsights: action.payload, loading: false };
      break;
    }
  }

  return state;
}

import { InsightFormData, User } from '@insight/shared-model';

import { NewInsightAction, NewInsightActionTypes } from './new-insight.actions';

export const NEW_INSIGHT_FEATURE_KEY = 'newInsight';

interface UserSearch {
  users: User[];
  loading: boolean;
  searchTerm: string;
}

interface InsightForm {
  data: Partial<InsightFormData>;
  pending: boolean;
}

export interface NewInsightState {
  userSearch: UserSearch;
  form: InsightForm;
  error?: any;
}

export interface NewInsightPartialState {
  readonly [NEW_INSIGHT_FEATURE_KEY]: NewInsightState;
}

export const initialState: NewInsightState = {
  userSearch: {
    users: [],
    loading: false,
    searchTerm: ''
  },
  form: {
    data: {
      sender: null,
      receiver: null,
      continueMessage: ''
    },
    pending: false
  }
};

export function newInsightReducer(state: NewInsightState = initialState, action: NewInsightAction): NewInsightState {
  switch (action.type) {
    case NewInsightActionTypes.SearchUser: {
      state = {...state, userSearch: { ...state.userSearch, loading: action.payload.length > 1, searchTerm: action.payload }};
      break;
    }
    case NewInsightActionTypes.SearchUserLoaded: {
      state = { ...state, userSearch: { ...state.userSearch, loading: false, users: action.payload }};
      break;
    }
    case NewInsightActionTypes.SearchUserError: {
      state = { ...state, userSearch: { ...state.userSearch, loading: false }, error: action.payload };
      break;
    }

    case NewInsightActionTypes.SubmitForm: {
      state = { ...state, form: { data: { ...action.payload }, pending: true }};
      break;
    }
    case NewInsightActionTypes.SubmitFormSuccess: {
      state = { ...initialState };
      break;
    }
    case NewInsightActionTypes.SubmitFormError: {
      state = { ...state, error: action.payload };
      break;
    }
  }

  return state;
}

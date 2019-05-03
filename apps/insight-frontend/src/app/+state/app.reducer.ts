import { AppAction, AppActionTypes } from './app.actions';

import { AssignmentResult, User } from '@insight/shared-model';

export const APP_FEATURE_KEY = 'app';

export interface AppState {
  user: User;
  assignments: AssignmentResult[];
  loading: boolean;
  error?: any;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const appInitialState: AppState = {
  user: null,
  assignments: [],
  loading: false
};

export function appReducer(state: AppState = appInitialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionTypes.Login: {
      state = { ...state, loading: true};
      break;
    }
    case AppActionTypes.SetUser: {
      state = { ...state, user: action.payload, loading: false };
      break;
    }

    case AppActionTypes.Logout: {
      state = { ...state };
      break;
    }
    case AppActionTypes.LogoutSuccess: {
      state = { ...appInitialState };
      break;
    }

    case AppActionTypes.AuthError: {
      state = { ...appInitialState, error: action.payload, user: null };
      break;
    }

    case AppActionTypes.GetAssignmentsSuccess: {
      state = { ...state, assignments: action.payload };
      break;
    }

    case AppActionTypes.GetAssignmentsError: {
      state = { ...state, error: action.payload };
      break;
    }
  }

  return state;
}

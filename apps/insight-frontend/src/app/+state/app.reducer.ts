import { AppAction, AppActionTypes } from './app.actions';

import { UserModel } from '@insight/shared-model';

export const APP_FEATURE_KEY = 'app';

export interface AppState {
  user: UserModel;
  error: any;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const initialState: AppState = {
  user: null,
  error: null
};

export function appReducer(state: AppState = initialState, action: AppAction): AppState {
  switch (action.type) {
    case AppActionTypes.InitApp: {
      state = { ...state};
      break;
    }
    case AppActionTypes.Login: {
      state = { ...state};
      break;
    }
    case AppActionTypes.SetUser: {
      state = { ...state, user: action.payload };
      break;
    }
    case AppActionTypes.LoginError: {
      state = { ...state, error: action.payload, user: null };
      break;
    }

    case AppActionTypes.Logout: {
      state = { ...state };
      break;
    }
    case AppActionTypes.LogoutSuccess: {
      state = { ...initialState };
      break;
    }
    case AppActionTypes.LogoutError: {
      state = { ...initialState, error: action.payload };
      break;
    }
  }

  return state;
}

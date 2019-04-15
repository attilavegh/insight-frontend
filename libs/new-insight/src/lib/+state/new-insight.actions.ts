import { Action } from '@ngrx/store';

import { InsightFormData, User } from '@insight/shared-model';

export enum NewInsightActionTypes {
  SearchUser = '[NewInsight] Search User',
  SearchUserLoaded = '[NewInsight] Search User Loaded',
  SearchUserError = '[NewInsight] Search User Error',

  SubmitForm = '[NewInsight] Submit Form',
  SubmitFormSuccess = '[NewInsight] Submit Form Success',
  SubmitFormError = '[NewInsight] Submit Form Error'
}

export class SearchUser implements Action {
  readonly type = NewInsightActionTypes.SearchUser;
  constructor(public payload: string) {}
}

export class SearchUserLoaded implements Action {
  readonly type = NewInsightActionTypes.SearchUserLoaded;
  constructor(public payload: User[]) {}
}

export class SearchUserError implements Action {
  readonly type = NewInsightActionTypes.SearchUserError;
  constructor(public payload: any) {}
}

export class SubmitForm implements Action {
  readonly type = NewInsightActionTypes.SubmitForm;
  constructor(public payload: Partial<InsightFormData>) {}
}

export class SubmitFormSuccess implements Action {
  readonly type = NewInsightActionTypes.SubmitFormSuccess;
}

export class SubmitFormError implements Action {
  readonly type = NewInsightActionTypes.SubmitFormError;
  constructor(public payload: any) {}
}

export type NewInsightAction =
  | SearchUser
  | SearchUserLoaded
  | SearchUserError

  | SubmitForm
  | SubmitFormSuccess
  | SubmitFormError;

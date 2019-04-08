import { Action } from '@ngrx/store';
import { Entity } from './new-insight.reducer';

export enum NewInsightActionTypes {
  LoadNewInsight = '[NewInsight] Load NewInsight',
  NewInsightLoaded = '[NewInsight] NewInsight Loaded',
  NewInsightLoadError = '[NewInsight] NewInsight Load Error'
}

export class LoadNewInsight implements Action {
  readonly type = NewInsightActionTypes.LoadNewInsight;
}

export class NewInsightLoadError implements Action {
  readonly type = NewInsightActionTypes.NewInsightLoadError;
  constructor(public payload: any) {}
}

export class NewInsightLoaded implements Action {
  readonly type = NewInsightActionTypes.NewInsightLoaded;
  constructor(public payload: Entity[]) {}
}

export type NewInsightAction =
  | LoadNewInsight
  | NewInsightLoaded
  | NewInsightLoadError;

export const fromNewInsightActions = {
  LoadNewInsight,
  NewInsightLoaded,
  NewInsightLoadError
};

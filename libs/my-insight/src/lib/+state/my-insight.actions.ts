import { Action } from '@ngrx/store';
import { Entity } from './my-insight.reducer';

export enum MyInsightActionTypes {
  LoadMyInsight = '[MyInsight] Load MyInsight',
  MyInsightLoaded = '[MyInsight] MyInsight Loaded',
  MyInsightLoadError = '[MyInsight] MyInsight Load Error'
}

export class LoadMyInsight implements Action {
  readonly type = MyInsightActionTypes.LoadMyInsight;
}

export class MyInsightLoadError implements Action {
  readonly type = MyInsightActionTypes.MyInsightLoadError;
  constructor(public payload: any) {}
}

export class MyInsightLoaded implements Action {
  readonly type = MyInsightActionTypes.MyInsightLoaded;
  constructor(public payload: Entity[]) {}
}

export type MyInsightAction =
  | LoadMyInsight
  | MyInsightLoaded
  | MyInsightLoadError;

export const fromMyInsightActions = {
  LoadMyInsight,
  MyInsightLoaded,
  MyInsightLoadError
};

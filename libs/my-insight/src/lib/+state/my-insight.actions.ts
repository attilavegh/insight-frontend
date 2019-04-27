import { Action } from '@ngrx/store';

import { Insight, InsightFilterModel } from '@insight/shared-model';

export enum MyInsightActionTypes {
  GetReceivedInsights = '[MyInsight] Get Received Insights',
  LoadReceivedInsights = '[MyInsight] Load Received Insights',
  ReceivedInsightsLoaded = '[MyInsight] Received Insight Loaded',

  GetSentInsights = '[MyInsight] Get Sent Insights',
  LoadSentInsights = '[MyInsight] Load Sent Insights',
  SentInsightsLoaded = '[MyInsight] Sent Insight Loaded',

  UpdateSentInsights = '[MyInsight] Update Sent Insights',

  InsightLoadError = '[MyInsight] Insight Load Error',

  ChangeInsightFilter = '[MyInsight] Filter Insights',
  InsightFilterChanged = '[MyInsight] Insight Filter Changed'
}

export class GetReceivedInsights implements Action {
  readonly type = MyInsightActionTypes.GetReceivedInsights;
}

export class LoadReceivedInsights implements Action {
  readonly type = MyInsightActionTypes.LoadReceivedInsights;
}

export class ReceivedInsightsLoaded implements Action {
  readonly type = MyInsightActionTypes.ReceivedInsightsLoaded;
  constructor(public payload: Insight[]) {}
}

export class GetSentInsights implements Action {
  readonly type = MyInsightActionTypes.GetSentInsights;
}

export class LoadSentInsights implements Action {
  readonly type = MyInsightActionTypes.LoadSentInsights;
}

export class SentInsightsLoaded implements Action {
  readonly type = MyInsightActionTypes.SentInsightsLoaded;
  constructor(public payload: Insight[]) {}
}

export class InsightLoadError implements Action {
  readonly type = MyInsightActionTypes.InsightLoadError;
  constructor(public payload: any) {}
}

export class UpdateSentInsights implements Action {
  readonly type = MyInsightActionTypes.UpdateSentInsights;
  constructor(public payload: Insight) {}
}

export class ChangeInsightFilter implements Action {
  readonly type = MyInsightActionTypes.ChangeInsightFilter;
  constructor(public payload: InsightFilterModel) {}
}

export class InsightFilterChanged implements Action {
  readonly type = MyInsightActionTypes.InsightFilterChanged;
  constructor(public payload: Insight[]) {}
}

export type MyInsightAction =
  GetReceivedInsights
  | LoadReceivedInsights
  | ReceivedInsightsLoaded

  | GetSentInsights
  | LoadSentInsights
  | SentInsightsLoaded

  | InsightLoadError

  | UpdateSentInsights

  | ChangeInsightFilter
  | InsightFilterChanged;

import { Insight } from '@insight/shared-model';

export enum InsightFilterType {
  ALL = 'all',
  LAST_DAY = 'last_day',
  LAST_MONTH = 'last_month',
  LAST_SIX_MONTHS = 'last_six_months',
  LAST_YEAR = 'last_year'
}

export interface InsightFilterModel {
  name: string;
  value: InsightFilterType;
  filterFn?: (insight: Insight) => {};
}

export const defaultFilter: InsightFilterModel = {
  name: 'All',
  value: InsightFilterType.ALL,
};

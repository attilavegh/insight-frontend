import { Insight } from '@insight/shared-model';

export enum InsightFilterType {
  ALL = 'all',
  TODAY = 'today',
  LAST_MONTH = 'last_month',
  LAST_SIX_MONTHS = 'last_six_months',
  LAST_YEAR = 'last_year'
}

export interface InsightFilterModel {
  name: string;
  value: InsightFilterType;
  filterFn?: (insight: Insight) => {};
  bucketName?: string;
}

export const defaultFilter: InsightFilterModel = {
  name: 'All',
  value: InsightFilterType.ALL,
};

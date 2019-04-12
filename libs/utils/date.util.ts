import * as moment from 'moment';
import { now } from 'moment';
import Diff = moment.unitOfTime.Diff;

export const format = (date: Date | string): string => {
  return moment.utc(date).format('YYYY.MM.DD');
};

export const diffFromNow = (date: Date, unit: Diff = 'months'): number => {
  return moment(now()).diff(moment(date), unit, true);
};

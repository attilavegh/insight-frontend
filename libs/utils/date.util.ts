import * as moment from 'moment';
import { now } from 'moment';
import Diff = moment.unitOfTime.Diff;

export const format = (date: Date | string): string => {
  return moment.utc(date).format('YYYY.MM.DD');
};

export const isFromToday = (date: Date): boolean => {
  return moment(date) > moment().endOf('day').subtract(1, 'day');
};

export const isFromLastMonths = (date: Date, amount: number): boolean => {
  return moment(date) > moment().startOf('month').subtract(amount, 'month');
};

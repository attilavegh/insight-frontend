import { User } from './user';

export interface Insight {
  id: number;
  sender: User;
  receiver: User;
  continueMessage: string;
  considerMessage: string;
  date: Date;
  formattedDate: string;
}

export interface InsightFormData {
  sender: string;
  receiver: string;
  continueMessage: string;
  considerMessage?: string;
}

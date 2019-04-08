import { UserModel } from './user.model';

export interface InsightModel {
  id: number;
  sender: UserModel;
  receiver: UserModel;
  continueContent: string;
  considerContent: string;
  date: Date; 
}

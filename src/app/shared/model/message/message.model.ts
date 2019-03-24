import { User } from '../user/user.model';

export interface MessageModel {
  id: number;
  sender: User;
  receiver: User;
  continueContent: string;
  considerContent: string;
  date: Date; 
}

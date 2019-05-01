export enum NotificationType {
  SUCCESS, ERROR
}

export interface NotificationPayload {
  message: string;
  type: NotificationType;
}

export const notificationMessage = {
  generalError: 'An error happened, try again!',
  sendSuccess: 'Insight has been successfully sent!',
};

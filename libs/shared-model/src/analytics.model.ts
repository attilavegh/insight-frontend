export enum EventCategory {
  PageView = 'page_view',
  Authentication = 'authentication',
  SendInsight = 'send_insight',
  Filter = 'filter'
}

export interface EventParameters {
  event_label?: string;
  url?: string;
  value?: number;
}

import { EventCategory, EventParameters } from '@insight/shared-model';

import { AnalyticsServiceShape } from './analytics.service';

class AnalyticsMockService implements AnalyticsServiceShape {
  log(eventCategory: EventCategory, eventName?: string, params?: EventParameters): void {
  }
}

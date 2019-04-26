import { Injectable } from '@angular/core';

import { EventCategory, EventParameters } from '@insight/shared-model';

import { ScriptInjectorService } from '../script-injector/script-injector.service';

import { analyticsScriptUrl, trackingId } from './analytics.config';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

type GTagMethod = (...args: any[]) => void;

export interface AnalyticsServiceShape {
  log(eventCategory: EventCategory, eventName?: string, params?: EventParameters): void;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements AnalyticsServiceShape {

  gtag: GTagMethod = () => {};

  constructor(private scriptInjectorService: ScriptInjectorService) {
    window.dataLayer = window.dataLayer || [];

    this.gtag = function () {
      window.dataLayer.push(arguments);
    };

    this.gtag('js', new Date());
    this.gtag('config', trackingId, { 'send_page_view': false });

    this.scriptInjectorService.inject(trackingId, analyticsScriptUrl).subscribe();
  }

  log(eventCategory: EventCategory, eventName?: string, params?: EventParameters): void {
    if (eventCategory === EventCategory.PageView) {
      this.pageView(params.url);
    } else {
      this.gtag('event', eventName, { event_category: eventCategory, ...params });
    }
  }

  setUser(userId: string) {
    this.gtag('set', {'user_id': userId});
  }

  private pageView(url: string) {
    this.gtag('config', trackingId, { page_path: url });
  }
}

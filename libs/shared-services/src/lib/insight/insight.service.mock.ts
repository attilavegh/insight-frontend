import { Insight, InsightFormData } from '@insight/shared-model';

import { Observable, of } from 'rxjs';

import { InsightServiceShape } from './insight.service';

export class InsightServiceMock implements InsightServiceShape {
  getReceivedInsights(id: string): Observable<Insight[]> {
    return of([]);
  }

  getSentInsights(id: string): Observable<Insight[]> {
    return of([]);
  }

  send(insight: InsightFormData): Observable<Insight> {
    return of(null);
  }
}

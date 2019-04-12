import { Insight } from '@insight/shared-model';

import { Observable, of } from 'rxjs';

import { InsightServiceShape } from './insight.service';

class InsightServiceMock implements InsightServiceShape {

  getReceivedInsights(id: number): Observable<Insight[]> {
    return of([]);
  }

  getSentInsights(id: number): Observable<Insight[]> {
    return of([]);
  }

  send(insight: Insight): Observable<Insight> {
    return of();
  }
}

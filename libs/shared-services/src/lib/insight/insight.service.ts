import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Insight } from '@insight/shared-model';
import { environmentToken } from '@insight/environment';

import { Observable } from 'rxjs';

export interface InsightServiceShape {
  send(insight: Insight): Observable<Insight>;
  getReceivedInsights(id: number): Observable<Insight[]>;
  getSentInsights(id: number): Observable<Insight[]>;
}

@Injectable({
  providedIn: 'root'
})
export class InsightService implements InsightServiceShape{

  constructor(@Inject(environmentToken) private environment: string,
              private http: HttpClient) {}

  send(insight: Insight): Observable<Insight> {
    return this.http.post<Insight>(`${this.environment}/insight/send/`, insight);
  }

  getReceivedInsights(id: number): Observable<Insight[]> {
    return this.http.get<Insight[]>(`${this.environment}/insight/received/${id}`);
  }

  getSentInsights(id: number): Observable<Insight[]> {
    return this.http.get<Insight[]>(`${this.environment}/insight/sent/${id}`);
  }
}

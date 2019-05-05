import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environmentToken } from '@insight/environment';
import { AssignmentResult, DeviceType } from '@insight/shared-model';

import { Observable } from 'rxjs';

export interface SplitterServiceShape {
  assign(googleId: string, deviceType: DeviceType): Observable<AssignmentResult[]>;
  isMocked(): boolean;
  parseMockedData(): AssignmentResult[];
}

@Injectable({
  providedIn: 'root'
})
export class SplitterService implements SplitterServiceShape {

  private readonly mockedSplitterKey: string = 'EXPERIMENTS';

  constructor(@Inject(environmentToken) private environment: string,
              private http: HttpClient) {}

  assign(googleId: string, deviceType: DeviceType): Observable<AssignmentResult[]> {
    return this.http.post<AssignmentResult[]>(`${this.environment}/experiment/assign/`, { googleId, deviceType });
  }

  isMocked(): boolean {
    return !!this.getMockData();
  }

  parseMockedData(): AssignmentResult[] {
    return JSON.parse(this.getMockData());
  }

  private getMockData() {
    return localStorage.getItem(this.mockedSplitterKey);
  }
}

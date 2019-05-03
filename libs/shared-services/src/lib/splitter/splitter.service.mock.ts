import { AssignmentResult, DeviceType } from '@insight/shared-model';

import { Observable, of } from 'rxjs';

import { SplitterServiceShape } from './splitter.service';

export class SplitterServiceMock implements SplitterServiceShape {
  assign(googleId: string, deviceType: DeviceType): Observable<AssignmentResult[]> {
    return of(null);
  }

  isMocked(): boolean {
    return false;
  }

  parseMockedData(): AssignmentResult[] {
    return [];
  }
}

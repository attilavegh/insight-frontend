import { User } from '@insight/shared-model';

import { Observable, of } from 'rxjs';

import { UserServiceShape } from './user.service';

export class UserServiceMock implements UserServiceShape {
  search(fragment: string): Observable<User[]> {
    return of([]);
  }
}

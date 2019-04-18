import { Observable, of } from 'rxjs';

import { User } from '@insight/shared-model';

import { OneTimeAuthCode, AuthToken } from '../../model/authentication.model';

import { AuthenticationServiceShape } from './authentication.service';

export class AuthenticationServiceMock implements AuthenticationServiceShape {

  authenticate(authCode: OneTimeAuthCode): Observable<AuthToken> {
    return of(null);
  }

  getUser(token: string): User | null {
    return null;
  }

  login(): Observable<OneTimeAuthCode> {
    return of(null);
  }

  refreshToken(): Observable<AuthToken> {
    return of(null);
  }
}

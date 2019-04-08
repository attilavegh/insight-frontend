import { UserModel } from '@insight/shared-model';

import { Observable, of } from 'rxjs';

import { AuthenticationServiceShape } from './authentication.service';

import { SocialUser } from 'angularx-social-login';

export class AuthenticationServiceMock implements AuthenticationServiceShape {
  getUser(): Observable<UserModel> {
    return of();
  }

  login(): Observable<SocialUser> {
    return of();
  }

  logout(): Observable<any> {
    return of();
  }

  verifyUser(_: SocialUser): Observable<UserModel> {
    return of();
  }
}

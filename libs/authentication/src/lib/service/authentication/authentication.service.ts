import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { User } from '@insight/shared-model';
import { environmentToken } from '@insight/environment';

import { GoogleLoginProviderService } from '../google-login-provider/google-login-provider.service';
import { OneTimeAuthCode, AuthToken, refreshTokenName } from '../../model/authentication.model';

export interface AuthenticationServiceShape {
  login(): Observable<OneTimeAuthCode>;
  authenticate(authCode: OneTimeAuthCode): Observable<AuthToken>;
  getUser(token: string): User | null;
  refreshToken(): Observable<AuthToken>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthenticationServiceShape {

  constructor(@Inject(environmentToken) private environment: string,
              private router: Router,
              private http: HttpClient,
              private googleLoginProvider: GoogleLoginProviderService) {
  }

  login(): Observable<OneTimeAuthCode> {
    return this.googleLoginProvider.login();
  }

  authenticate(authCode: OneTimeAuthCode): Observable<AuthToken> {
    return this.http.post<AuthToken>(`${this.environment}/user/login`, authCode);
  }

  refreshToken() {
    const authToken: AuthToken = {idToken: null, refreshToken: localStorage.getItem(refreshTokenName)};
    return this.http.post<AuthToken>(`${this.environment}/user/refresh_token`, authToken);
  }

  getUser(token: string): User | null {
    return this.googleLoginProvider.decodeIdToken(token);
  }
}


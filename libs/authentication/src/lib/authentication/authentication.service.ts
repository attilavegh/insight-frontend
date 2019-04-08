import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

import { UserModel } from '@insight/shared-model';
import { environmentToken } from '@insight/environment';

import { fromPromise } from 'rxjs/internal-compatibility';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { loginOpt } from './authentication.config';

export interface AuthenticationServiceShape {
  login(): Observable<SocialUser>;
  verifyUser(user: SocialUser): Observable<UserModel>;
  logout(): Observable<any>;
  getUser(): Observable<UserModel>;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthenticationServiceShape {

  constructor(@Inject(environmentToken) private environment: string,
              private router: Router,
              private http: HttpClient,
              private authService: AuthService) {}

  login(): Observable<SocialUser> {
    return fromPromise(this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, loginOpt));
  }

  verifyUser(user: SocialUser): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.environment}/user/login`, user);
  }

  logout(): Observable<any> {
    return fromPromise(this.authService.signOut());
  }

  getUser(): Observable<UserModel> {
    return this.authState.pipe(
      filter((user: SocialUser) => !!user),
      switchMap((user: SocialUser) => this.fetchUser(user.id))
    );
  }

  private fetchUser(googleId): Observable<UserModel> {
    return this.http.get<UserModel>(`${this.environment}/user/${googleId}`);
  }

  get authState() {
    return this.authService.authState;
  }
}

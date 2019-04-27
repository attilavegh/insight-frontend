import { Injectable } from '@angular/core';

import { ScriptInjectorService } from '@insight/shared-services';
import { User } from '@insight/shared-model';

import { Observable, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { OneTimeAuthCode } from '../../model/authentication.model';

import { authConfig, scriptId, scriptUrl } from './google-login-provider.config';

import * as jwtDecoder from 'jwt-decode';

declare let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginProviderService {

  auth2 = new ReplaySubject(1);

  constructor(private scriptInjector: ScriptInjectorService) {
    this.injectGoogleAuthScript().pipe(
      map(() => this.initGoogleAuth())
    ).subscribe();
  }

  login(): Observable<OneTimeAuthCode> {
    return this.auth2.pipe(
      switchMap((auth2: any) => this.grantAccess(auth2))
    );
  }

  private initGoogleAuth() {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init(authConfig);
      this.auth2.next(auth2);
    });
  }

  private grantAccess(auth2: any): Observable<OneTimeAuthCode> {
    return new Observable(observer => {
      auth2.grantOfflineAccess()
        .then((code: OneTimeAuthCode) => {
          observer.next(code);
          observer.complete();
        })
        .catch(error => observer.error(error));
    });
  }

  decodeIdToken(token: string): User | null {
    try {
      const decodedToken = jwtDecoder(token);
      return {
        googleId: decodedToken.sub,
        fullName: decodedToken.name,
        firstName: decodedToken.given_name,
        lastName: decodedToken.family_name,
        email: decodedToken.email,
        imageUrl: decodedToken.picture
      };
    } catch (error) {
      return null;
    }
  }

  private injectGoogleAuthScript() {
    return this.scriptInjector.inject(scriptId, scriptUrl);
  }
}

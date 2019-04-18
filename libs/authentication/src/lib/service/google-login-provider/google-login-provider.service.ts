import { Injectable } from '@angular/core';

import { ScriptInjectorService } from '@insight/shared-services';
import { User } from '@insight/shared-model';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { OneTimeAuthCode } from '../../model/authentication.model';

import { authConfig, scriptId, scriptUrl } from './google-login-provider.config';

import * as jwtDecoder from 'jwt-decode';

declare let gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginProviderService {

  constructor(private scriptInjector: ScriptInjectorService) {}

  login(): Observable<OneTimeAuthCode> {
    return this.injectGoogleAuthScript().pipe(
      switchMap(() => this.initGoogleAuth()),
      switchMap((auth2: any) => this.grantAccess(auth2))
    );
  }

  private initGoogleAuth(): Observable<any> {
    return new Observable(observer => {
      gapi.load('auth2', () => {
        const auth2 = gapi.auth2.init(authConfig);

        observer.next(auth2);
        observer.complete();
      });
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

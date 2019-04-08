import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { AuthenticationService } from '../authentication/authentication.service';

import { Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { filter, flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationService.authState.pipe(
      filter((user: SocialUser) => !!user),
      flatMap((user: SocialUser) => this.addToken(request, next, user.idToken))
    );
  }

  addToken(request: HttpRequest<any>, next: HttpHandler, idToken: string) {
    const tokenizedRequest = request.clone({
      setHeaders: {
        'Authorization': `Bearer ${idToken}`
      }
    });

    localStorage.setItem('token', idToken);
    return next.handle(tokenizedRequest);
  }
}

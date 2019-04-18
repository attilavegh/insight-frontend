import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, take, tap } from 'rxjs/operators';

import { AuthenticationService } from '../../service/authentication/authentication.service';
import { AuthToken, authTokenName, tokenPrefix } from '../../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  isRefreshingToken = false;
  refreshedToken = new BehaviorSubject<string>(null);

  constructor(private authentication: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(authTokenName);
    const tokenizedRequest = this.tokenizeRequest(request, token);

    return next.handle(tokenizedRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 403) {
            return this.refreshToken(request, next);
          } else {
            return throwError(error);
          }
        }
      })
    );
  }

  private tokenizeRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: tokenPrefix + token
      }
    });
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.initTokenRefresh();

      return this.authentication.refreshToken().pipe(
        map((authToken: AuthToken) => authToken.idToken),
        tap((token: string) => this.storeRefreshedToken(token)),
        switchMap((token: string) => next.handle(this.tokenizeRequest(request, token))),
        catchError(error => throwError(error)),
        finalize(() => this.isRefreshingToken = false)
      );
    } else {
      return this.refreshedToken.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => next.handle(this.tokenizeRequest(request, token)))
      );
    }
  }

  private initTokenRefresh() {
    this.isRefreshingToken = true;
    this.refreshedToken.next(null);
  }

  private storeRefreshedToken(token: string) {
    this.refreshedToken.next(token);
    localStorage.setItem(authTokenName, token);
  }
}

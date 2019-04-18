import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { authTokenName } from '../../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem(authTokenName);

    if (token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

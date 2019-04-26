import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';

import { authTokenName } from '../../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate, CanLoad {

  constructor(private router: Router) {}

  canActivate(): boolean {
    return this.canAccessLogoutPage();
  }

  canLoad(): boolean {
    return this.canAccessLogoutPage();
  }

  private canAccessLogoutPage(): boolean {
    const token = localStorage.getItem(authTokenName);

    if (token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}

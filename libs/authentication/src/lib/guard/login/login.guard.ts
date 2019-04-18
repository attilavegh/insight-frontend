import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

import { authTokenName } from '../../model/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {

  constructor(private router: Router) {}

  canLoad(): boolean {
    const token = localStorage.getItem(authTokenName);

    if (token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

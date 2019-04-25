import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from '@insight/shared-model';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Component({
  selector: 'insight-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routeChangeSubscription: Subscription;
  userSubscription: Subscription;

  isMobileMenuOpen = false;
  isDesktopMenuOpen = false;
  user: User;

  constructor(private router: Router,
              private appFacade: AppFacade) {
  }

  ngOnInit() {
    this.userSubscription = this.appFacade.user$.subscribe(this.setUser.bind(this));

    this.routeChangeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      tap(() => this.isMobileMenuOpen = false)
    ).subscribe();
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }

  toggle() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  logout() {
    this.appFacade.logout();
  }

  focusDesktopMenu() {
    this.isDesktopMenuOpen = true;
  }

  blurDesktopMenu() {
    this.isDesktopMenuOpen = false;
  }

  private setUser(user: User) {
    this.user = user;
  }
}

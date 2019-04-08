import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Component({
  selector: 'insight-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routeChangeSubscription: Subscription;

  isOpen = false;
  isMenuButtonVisible = false;

  user$ = this.appFacade.user$;

  constructor(private router: Router,
              private appFacade: AppFacade) {}

  ngOnInit() {
    this.routeChangeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      tap((navigation: NavigationStart) => {
        this.isOpen = false;
        this.isMenuButtonVisible = navigation.url !== '/login';
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  logout() {
    this.appFacade.logout();
  }
}

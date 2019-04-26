import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AnalyticsService } from '@insight/shared-services';
import { EventCategory } from '@insight/shared-model';

import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AppFacade } from './+state/app.facade';

@Component({
  selector: 'insight-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;

  constructor(private appFacade: AppFacade,
              private analytics: AnalyticsService,
              private router: Router) {}

  ngOnInit() {
    this.appFacade.initApp();
    this.appFacade.initNotification();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => this.analytics.log(EventCategory.PageView, event.url, { url: event.urlAfterRedirects }))
    ).subscribe();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  };
}

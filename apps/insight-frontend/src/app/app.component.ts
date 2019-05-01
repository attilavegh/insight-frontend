import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { AnalyticsService, NotificationService } from '@insight/shared-services';
import { EventCategory, NotificationPayload, NotificationType } from '@insight/shared-model';

import { filter, tap } from 'rxjs/operators';
import { Observable, Subject, Subscription } from 'rxjs';

import { AppFacade } from './+state/app.facade';

@Component({
  selector: 'insight-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  notificationPayload$: Observable<NotificationPayload>;
  notificationDisplayStatus$: Observable<boolean>;

  routerSubscription: Subscription;

  constructor(private appFacade: AppFacade,
              private analytics: AnalyticsService,
              private router: Router,
              private notificationService: NotificationService) {}

  ngOnInit() {
    this.appFacade.initApp();
    this.appFacade.initNotification();

    this.notificationPayload$ = this.notificationService.payload$;
    this.notificationDisplayStatus$ = this.notificationService.display$;

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap((event: NavigationEnd) => this.analytics.log(EventCategory.PageView, event.url, { url: event.urlAfterRedirects }))
    ).subscribe();
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}

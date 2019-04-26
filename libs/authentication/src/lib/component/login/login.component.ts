import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { EventCategory } from '@insight/shared-model';
import { AnalyticsService } from '@insight/shared-services';

import { AppFacade } from '../../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Component({
  selector: 'insight-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loading$ = this.appFacade.loading$;

  constructor(private appFacade: AppFacade,
              private analytics: AnalyticsService) {}

  ngOnInit() {}

  login() {
    this.analytics.log(EventCategory.Authentication, 'login');
    this.appFacade.login();
  }
}


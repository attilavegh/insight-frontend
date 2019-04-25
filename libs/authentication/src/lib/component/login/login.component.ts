import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AppFacade } from '../../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Component({
  selector: 'insight-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loading$ = this.appFacade.loading$;

  constructor(private appFacade: AppFacade) {}

  ngOnInit() {}

  login() {
    this.appFacade.login();
  }
}


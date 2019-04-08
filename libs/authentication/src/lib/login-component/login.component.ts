import { Component, OnInit } from '@angular/core';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Component({
  selector: 'insight-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private appFacade: AppFacade) {}

  ngOnInit() {}

  login() {
    this.appFacade.login();
  }
}


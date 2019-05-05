import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NavigationLinks } from '@insight/shared-model';
import { LayoutService } from '@insight/shared-services';

import { share } from 'rxjs/operators';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';

@Component({
  selector: 'insight-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  user$ = this.appFacade.user$.pipe(share());
  activePage$ = this.appFacade.activeUrl$;
  desktopLayoutObserver$ = this.layout.desktopLayoutObserver$;

  navigationLinks: NavigationLinks = {
    sendInsight: '/',
    myInsights: '/insights'
  };

  constructor(private appFacade: AppFacade,
              private layout: LayoutService) {}

  onLogout() {
    this.appFacade.logout();
  }
}

import { EventEmitter } from '@angular/core';

import { User } from '@insight/shared-model';

export type NavigationLink = string;

export interface NavigationLinks {
  sendInsight: NavigationLink;
  myInsights: NavigationLink;
}

export interface HeaderComponentShape {
  user: User;
  isOpen: boolean;
  navigationLinks: NavigationLinks;
  logoutChange: EventEmitter<boolean>;

  logout();
}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HeaderComponentShape, NavigationLinks, User } from '@insight/shared-model';

@Component({
  selector: 'insight-header-desktop',
  templateUrl: './header-desktop.component.html',
  styleUrls: ['./header-desktop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderDesktopComponent implements HeaderComponentShape {

  @Input() user: User;
  @Input() navigationLinks: NavigationLinks;

  @Output() logoutChange: EventEmitter<boolean> = new EventEmitter();

  isOpen = false;

  constructor() {}

  focusDesktopMenu() {
    this.isOpen = true;
  }

  blurDesktopMenu() {
    this.isOpen = false;
  }

  logout() {
    this.logoutChange.emit(true);
  }
}

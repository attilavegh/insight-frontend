import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { HeaderComponentShape, NavigationLink, NavigationLinks, User } from '@insight/shared-model';

@Component({
  selector: 'insight-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderMobileComponent implements OnChanges, HeaderComponentShape {

  @Input() user: User;
  @Input() activePage: NavigationLink;
  @Input() navigationLinks: NavigationLinks;

  @Output() logoutChange: EventEmitter<boolean> = new EventEmitter();

  isOpen = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activePage) {
      this.isOpen = false;
    }
  }

  logout() {
    this.logoutChange.emit(true);
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'insight-hamburger-icon',
  templateUrl: './hamburger-icon.component.html',
  styleUrls: ['./hamburger-icon.component.scss']
})
export class HamburgerIconComponent {

  @Input()
  open: boolean;

  @Output()
  changeOpen = new EventEmitter<boolean>();

  constructor() {}

  toggle() {
    this.open = !this.open;
    this.changeOpen.emit(this.open);
  }
}

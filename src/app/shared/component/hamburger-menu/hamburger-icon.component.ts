import { Component, Input } from '@angular/core';

@Component({
  selector: 'insight-hamburger-icon',
  templateUrl: './hamburger-icon.component.html',
  styleUrls: ['./hamburger-icon.component.scss']
})
export class HamburgerIconComponent {

  @Input()
  open: boolean;

  constructor() {}

}

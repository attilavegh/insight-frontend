import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { Observable } from 'rxjs';

export interface LayoutServiceShape {
  desktopLayoutObserver$: Observable<BreakpointState>;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService implements LayoutServiceShape {

  private readonly minDesktopWidth = 768;

  desktopLayoutObserver$: Observable<BreakpointState>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.desktopLayoutObserver$ = this.breakpointObserver.observe([`(min-width: ${this.minDesktopWidth}px)`]);
  }
}

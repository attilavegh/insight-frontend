import { BreakpointState } from '@angular/cdk/layout';

import { Subject } from 'rxjs';

import { LayoutServiceShape } from './layout.service';

export class LayoutServiceMock implements LayoutServiceShape {
  desktopLayoutObserver$: Subject<BreakpointState> = new Subject<BreakpointState>();
}

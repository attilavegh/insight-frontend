import { ElementRef, Renderer2 } from '@angular/core';

import { RippleDirective } from './ripple.directive';

describe('RippleDirective', () => {
  it('should create an instance', () => {
    const directive = new RippleDirective({} as Renderer2, {} as ElementRef);
    expect(directive).toBeTruthy();
  });
});

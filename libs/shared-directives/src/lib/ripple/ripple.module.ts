import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleDirective } from './ripple.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [RippleDirective],
  exports: [RippleDirective]
})
export class RippleModule {}

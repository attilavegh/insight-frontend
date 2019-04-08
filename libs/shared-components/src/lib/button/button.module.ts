import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '@insight/shared-directives';

import { ButtonComponent } from './button.component';

@NgModule({
  imports: [CommonModule, RippleModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent]
})
export class ButtonModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RippleModule } from '@insight/shared-directives';

import { InsightTypeSelectorComponent } from './insight-type-selector.component';

@NgModule({
  imports: [CommonModule, RippleModule],
  declarations: [InsightTypeSelectorComponent],
  exports: [InsightTypeSelectorComponent]
})
export class InsightTypeSelectorModule {}

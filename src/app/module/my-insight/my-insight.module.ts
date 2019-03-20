import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyInsightComponent } from './container/my-insight/my-insight.component';

@NgModule({
  declarations: [
    MyInsightComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MyInsightComponent
  ]
})
export class MyInsightModule { }

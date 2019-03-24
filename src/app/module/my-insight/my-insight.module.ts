import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MyInsightComponent } from './container/my-insight/my-insight.component';
import { MessageTypeSelectorComponent } from './container/component/message-type-selector/message-type-selector.component';
import { MessageFilterComponent } from './container/component/message-filter/message-filter.component';
import { MessageComponent } from './container/component/message/message.component';

@NgModule({
  declarations: [
    MyInsightComponent,
    MessageTypeSelectorComponent,
    MessageFilterComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MyInsightComponent
  ]
})
export class MyInsightModule { }

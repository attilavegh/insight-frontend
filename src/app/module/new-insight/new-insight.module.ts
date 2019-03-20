import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { NewInsightComponent } from './container/new-insight/new-insight.component';
import { InsightTypeSelectorComponent } from './component/insight-type-selector/insight-type-selector.component';
import { UserSearchComponent } from './component/user-search/user-search.component';
import { InsightInputBoxComponent } from './component/insight-input-box/insight-input-box.component';

@NgModule({
  declarations: [
    NewInsightComponent,
    InsightTypeSelectorComponent,
    UserSearchComponent,
    InsightInputBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    NewInsightComponent
  ]
})
export class NewInsightModule { }

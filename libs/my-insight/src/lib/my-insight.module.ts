import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {
  MessageContainerModule,
  MessageFilterModule,
  MessageCategorySelectorModule,
  LoadingModule
} from '@insight/shared-components';
import { RippleModule } from '@insight/shared-directives';

import { MyInsightComponent } from './my-insight/my-insight.component';
import { MyInsightListComponent } from './my-insight-list/my-insight-list.component';
import { MY_INSIGHT_FEATURE_KEY, myInsightsInitialState as myInsightInitialState, myInsightReducer } from './+state/my-insight.reducer';
import { MyInsightEffects } from './+state/my-insight.effects';

const routes: Routes = [
  { path: '', component: MyInsightComponent,
    children: [
      { path: '', redirectTo: 'received', pathMatch: 'full' },
      { path: 'received', component: MyInsightListComponent },
      { path: 'sent', component: MyInsightListComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RippleModule,
    MessageContainerModule,
    MessageCategorySelectorModule,
    MessageFilterModule,
    LoadingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(MY_INSIGHT_FEATURE_KEY, myInsightReducer, {
      initialState: myInsightInitialState
    }),
    EffectsModule.forFeature([MyInsightEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyInsightComponent,
    MyInsightListComponent
  ],
  exports: [MyInsightComponent]
})
export class MyInsightModule {}

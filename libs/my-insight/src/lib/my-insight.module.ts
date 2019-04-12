import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MessageContainerModule, MessageFilterModule, MessageCategorySelectorModule, PagingModule } from '@insight/shared-components';
import { RippleModule } from '@insight/shared-directives';

import { MyInsightComponent } from './my-insight/my-insight.component';
import { MyInsightReceivedComponent } from './my-insight-received/my-insight-received.component';
import { MyInsightSentComponent } from './my-insight-sent/my-insight-sent.component';
import { MY_INSIGHT_FEATURE_KEY, myInsightsInitialState as myInsightInitialState, myInsightReducer } from './+state/my-insight.reducer';
import { MyInsightEffects } from './+state/my-insight.effects';

const routes: Routes = [
  { path: '', component: MyInsightComponent,
    children: [
      { path: '', redirectTo: 'received', pathMatch: 'full' },
      { path: 'received', component: MyInsightReceivedComponent },
      { path: 'sent', component: MyInsightSentComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    PagingModule,
    RippleModule,
    MessageContainerModule,
    MessageCategorySelectorModule,
    MessageFilterModule,
    ReactiveFormsModule,
    StoreModule.forFeature(MY_INSIGHT_FEATURE_KEY, myInsightReducer, {
      initialState: myInsightInitialState
    }),
    EffectsModule.forFeature([MyInsightEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: [
    MyInsightComponent,
    MyInsightReceivedComponent,
    MyInsightSentComponent
  ],
  exports: [MyInsightComponent]
})
export class MyInsightModule {}

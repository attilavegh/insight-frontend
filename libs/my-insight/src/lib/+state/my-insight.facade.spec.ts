import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { environmentToken } from '@insight/environment';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';

import { MyInsightEffects } from './my-insight.effects';
import { MyInsightFacade } from './my-insight.facade';

import {
  MyInsightState,
  myInsightsInitialState,
  myInsightReducer
} from './my-insight.reducer';

interface TestSchema {
  myInsight: MyInsightState;
}

describe('MyInsightFacade', () => {
  let facade: MyInsightFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          HttpClientTestingModule,
          StoreModule.forFeature('myInsight', myInsightReducer, {
            initialState: myInsightsInitialState
          }),
          EffectsModule.forFeature([MyInsightEffects])
        ],
        providers: [
          MyInsightFacade,
          {
            provide: environmentToken,
            useValue: 'http://localhost:4200'
          }
        ]
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule
        ]
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(MyInsightFacade);
    });
  });
});

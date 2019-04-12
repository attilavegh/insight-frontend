import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';

import { MyInsightEffects } from './my-insight.effects';

describe('MyInsightEffects', () => {
  let effects: MyInsightEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        MyInsightEffects,
        DataPersistence
      ]
    });

    effects = TestBed.get(MyInsightEffects);
  });

  describe('loadMyInsight$', () => {
  });
});

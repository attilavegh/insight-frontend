import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';

import { NewInsightEffects } from './new-insight.effects';

describe('NewInsightEffects', () => {
  let effects: NewInsightEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        NewInsightEffects,
        DataPersistence,
      ]
    });

    effects = TestBed.get(NewInsightEffects);
  });
});

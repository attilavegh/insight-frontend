import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { NewInsightEffects } from './new-insight.effects';
import { LoadNewInsight, NewInsightLoaded } from './new-insight.actions';

describe('NewInsightEffects', () => {
  let actions: Observable<any>;
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
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(NewInsightEffects);
  });

  describe('loadNewInsight$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadNewInsight() });
      expect(effects.loadNewInsight$).toBeObservable(
        hot('-a-|', { a: new NewInsightLoaded([]) })
      );
    });
  });
});

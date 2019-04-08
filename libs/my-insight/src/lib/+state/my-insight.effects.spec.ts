import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/nx';
import { DataPersistence } from '@nrwl/nx';
import { hot } from '@nrwl/nx/testing';

import { MyInsightEffects } from './my-insight.effects';
import { LoadMyInsight, MyInsightLoaded } from './my-insight.actions';

describe('MyInsightEffects', () => {
  let actions: Observable<any>;
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
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(MyInsightEffects);
  });

  describe('loadMyInsight$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadMyInsight() });
      expect(effects.loadMyInsight$).toBeObservable(
        hot('-a-|', { a: new MyInsightLoaded([]) })
      );
    });
  });
});

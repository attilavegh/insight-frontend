import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { InsightService } from '@insight/shared-services';
import { Insight, InsightCategory, User } from '@insight/shared-model';
import { format } from '@insight/utils';

import { filter, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { iif, of } from 'rxjs';

import { MyInsightPartialState } from './my-insight.reducer';
import { MyInsightFacade } from './my-insight.facade';
import {
  ChangeInsightFilter, InsightFilterChanged,
  InsightLoadError,
  LoadReceivedInsights,
  LoadSentInsights,
  MyInsightActionTypes,
  ReceivedInsightsLoaded,
  SentInsightsLoaded
} from './my-insight.actions';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';

const formatInsightsDate = (insights: Insight[]): Insight[] => {
  return insights.map((insight: Insight) => {
    return { ...insight, formattedDate: format(insight.date) };
  });
};

@Injectable()
export class MyInsightEffects {

  @Effect() getReceivedInsights$ = this.dataPersistence.fetch(MyInsightActionTypes.GetReceivedInsights, {
      run: () => {
        return this.myInsightFacade.receivedInsights$.pipe(
          take(1),
          mergeMap((insights: Insight[]) => iif(() => insights && insights.length > 0,
            of(new ReceivedInsightsLoaded(insights)),
            of(new LoadReceivedInsights())
          ))
        );
      },

      onError: (action: LoadReceivedInsights, error) => {
        console.error('Error', error);
        return new InsightLoadError(error);
      }
    }
  );

  @Effect() loadReceivedInsights$ = this.dataPersistence.fetch(MyInsightActionTypes.LoadReceivedInsights, {
      run: () => {
        return this.appFacade.user$.pipe(
          filter(user => !!user),
          switchMap((user: User) => this.insightService.getReceivedInsights(user.id)),
          map((insights: Insight[]) => formatInsightsDate(insights)),
          map((insights: Insight[]) => new ReceivedInsightsLoaded(insights))
        );
      },

      onError: (action: LoadReceivedInsights, error) => {
        console.error('Error', error);
        return new InsightLoadError(error);
      }
    }
  );

  @Effect() getSentInsights$ = this.dataPersistence.fetch(MyInsightActionTypes.GetSentInsights, {
      run: () => {
        return this.myInsightFacade.sentInsights$.pipe(
          take(1),
          mergeMap((insights: Insight[]) => iif(() => insights && insights.length > 0,
            of(new SentInsightsLoaded(insights)),
            of(new LoadSentInsights())
          ))
        );
      },

      onError: (action: LoadSentInsights, error) => {
        console.error('Error', error);
        return new InsightLoadError(error);
      }
    }
  );

  @Effect() loadSentInsights$ = this.dataPersistence.fetch(MyInsightActionTypes.LoadSentInsights, {
      run: () => {
        return this.appFacade.user$.pipe(
          filter(user => !!user),
          switchMap((user: User) => this.insightService.getSentInsights(user.id)),
          map((fetchedInsights: Insight[]) => formatInsightsDate(fetchedInsights)),
          map((insights) => new SentInsightsLoaded(insights))
        );
      },

      onError: (action: LoadSentInsights, error) => {
        console.error('Error', error);
        return new InsightLoadError(error);
      }
    }
  );

  @Effect() changeInsightFilter$ = this.dataPersistence.fetch(MyInsightActionTypes.ChangeInsightFilter, {
    run: (action: ChangeInsightFilter) => {
      return this.myInsightFacade.category$.pipe(
        take(1),
        mergeMap((category: InsightCategory) => iif(() => category === InsightCategory.SENT,
          this.myInsightFacade.sentInsights$,
          this.myInsightFacade.receivedInsights$
          )
        ),
        take(1),
        map((insights: Insight[]) => insights.filter(insight => action.payload.filterFn(insight))),
        map((insights: Insight[]) => new InsightFilterChanged(insights))
      );
    }
  });

  constructor(
    private actions$: Actions,
    private appFacade: AppFacade,
    private myInsightFacade: MyInsightFacade,
    private insightService: InsightService,
    private dataPersistence: DataPersistence<MyInsightPartialState>
  ) {}
}

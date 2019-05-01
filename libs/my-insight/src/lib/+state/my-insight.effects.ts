import { Injectable } from '@angular/core';

import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { Actions, Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';

import { InsightService, NotificationService } from '@insight/shared-services';
import { Insight, InsightCategory, notificationMessage, NotificationType, User } from '@insight/shared-model';
import { format } from '@insight/utils';

import { filter, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { iif, of } from 'rxjs';

import { MyInsightPartialState } from './my-insight.reducer';
import { MyInsightFacade } from './my-insight.facade';
import {
  ChangeInsightFilter, GetReceivedInsights, GetSentInsights, InsightFilterChanged,
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

  @Effect() onInsightNavigation = this.dataPersistence.fetch(ROUTER_NAVIGATION, {
      run: () => {
        const receivedUrl = '/insights/received';
        const sentUrl = '/insights/sent';

        const filterRoutes = (state) => {
          const payload = state.payload.routerState.url;
          return payload === receivedUrl || payload === sentUrl;
        };

        return this.actions$.pipe(
          take(1),
          filter(state => filterRoutes(state)),
          mergeMap((state: any) => iif(() => state.payload.routerState.url === receivedUrl,
            of(new GetReceivedInsights()),
            of(new GetSentInsights())
          ))
        );
      },

      onError: (action: LoadReceivedInsights, error) => {
        console.error('Error', error);
        return new InsightLoadError(error);
      }
    }
  );

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
          take(1),
          switchMap((user: User) => this.insightService.getReceivedInsights(user.googleId)),
          map((insights: Insight[]) => formatInsightsDate(insights)),
          map((insights: Insight[]) => new ReceivedInsightsLoaded(insights))
        );
      },

      onError: (action: LoadReceivedInsights, error) => {
        console.error('Error', error);
        this.notification.show(notificationMessage.generalError, NotificationType.ERROR);
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
          take(1),
          switchMap((user: User) => this.insightService.getSentInsights(user.googleId)),
          map((fetchedInsights: Insight[]) => formatInsightsDate(fetchedInsights)),
          map((insights) => new SentInsightsLoaded(insights))
        );
      },

      onError: (action: LoadSentInsights, error) => {
        console.error('Error', error);
        this.notification.show(notificationMessage.generalError, NotificationType.ERROR);
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
    private notification: NotificationService,
    private dataPersistence: DataPersistence<MyInsightPartialState>
  ) {
  }
}

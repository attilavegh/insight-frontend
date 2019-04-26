import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AnalyticsService } from '@insight/shared-services';
import { EventCategory, Insight, InsightFilterModel, InsightFilterType } from '@insight/shared-model';
import { diffFromNow } from '@insight/utils';

import { MyInsightFacade } from '../+state/my-insight.facade';

@Component({
  selector: 'insight-my-insight',
  templateUrl: './my-insight.component.html',
  styleUrls: ['./my-insight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInsightComponent implements OnInit {

  selectedFilter$ = this.myInsightFacade.filter$;

  filters: InsightFilterModel[] = [
    { name: 'All', value: InsightFilterType.ALL, filterFn: (insight: Insight) => !!insight },
    { name: 'Today', value: InsightFilterType.LAST_DAY, filterFn: (insight: Insight) => diffFromNow(insight.date, 'days') <= 1 },
    { name: 'Last month', value: InsightFilterType.LAST_MONTH, filterFn: (insight: Insight) => diffFromNow(insight.date) <= 1 },
    { name: 'Last 6 months', value: InsightFilterType.LAST_SIX_MONTHS, filterFn: (insight: Insight) => diffFromNow(insight.date) <= 6 },
    { name: 'Last year', value: InsightFilterType.LAST_YEAR, filterFn: (insight: Insight) => diffFromNow(insight.date) <= 12 },
  ];

  constructor(private myInsightFacade: MyInsightFacade,
              private analytics: AnalyticsService) {}

  ngOnInit() {}

  onFilterChange(filter: InsightFilterModel) {
    this.analytics.log(EventCategory.Filter, filter.value);
    this.myInsightFacade.changeInsightFilter(filter);
  }
}

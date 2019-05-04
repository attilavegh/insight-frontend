import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AnalyticsService } from '@insight/shared-services';
import { EventCategory, Insight, InsightFilterModel, InsightFilterType } from '@insight/shared-model';
import { isFromLastMonths, isFromToday } from '@insight/utils';

import { AppFacade } from '../../../../../apps/insight-frontend/src/app/+state/app.facade';
import { MyInsightFacade } from '../+state/my-insight.facade';

@Component({
  selector: 'insight-my-insight',
  templateUrl: './my-insight.component.html',
  styleUrls: ['./my-insight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInsightComponent implements OnInit {

  private readonly filterExperimentName = 'filter_action';
  private readonly notAssignedLabel = 'not_assigned';

  filterAssignment$ = this.appFacade.selectAssignment(this.filterExperimentName);
  selectedFilter$ = this.myInsightFacade.filter$;

  filters: InsightFilterModel[] = [
    { name: 'All', value: InsightFilterType.ALL, filterFn: (insight: Insight) => !!insight },
    { name: 'Today', value: InsightFilterType.TODAY, filterFn: (insight: Insight) => isFromToday(insight.date) },
    { name: 'Last month', value: InsightFilterType.LAST_MONTH, filterFn: (insight: Insight) => isFromLastMonths(insight.date, 1) },
    { name: 'Last 6 months', value: InsightFilterType.LAST_SIX_MONTHS, filterFn: (insight: Insight) => isFromLastMonths(insight.date, 6) },
    { name: 'Last year', value: InsightFilterType.LAST_YEAR, filterFn: (insight: Insight) => isFromLastMonths(insight.date, 12) },
  ];

  constructor(private myInsightFacade: MyInsightFacade,
              private appFacade: AppFacade,
              private analytics: AnalyticsService) {}

  ngOnInit() {}

  onFilterChange(filter: InsightFilterModel) {
    this.analytics.log(EventCategory.Filter, filter.value, { event_label: filter.bucketName || this.notAssignedLabel});
    this.myInsightFacade.changeInsightFilter(filter);
  }
}

import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Insight, InsightCategory } from '@insight/shared-model';

import { MyInsightFacade } from '../+state/my-insight.facade';

@Component({
  selector: 'insight-my-insight-received',
  templateUrl: './my-insight-received.component.html',
  styleUrls: ['./my-insight-received.component.scss']
})
export class MyInsightReceivedComponent implements OnInit {

  insights$: Observable<Insight[]> = this.myInsightFacade.displayedInsights$;
  insightCategory = InsightCategory;

  constructor(private myInsightFacade: MyInsightFacade) {}

  ngOnInit() {
    this.myInsightFacade.getReceivedInsights();
  }
}

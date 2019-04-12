import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Insight, InsightCategory } from '@insight/shared-model';

import { MyInsightFacade } from '../+state/my-insight.facade';

@Component({
  selector: 'insight-my-insight-sent',
  templateUrl: './my-insight-sent.component.html',
  styleUrls: ['./my-insight-sent.component.scss']
})
export class MyInsightSentComponent implements OnInit {

  insights$: Observable<Insight[]> = this.myInsightFacade.displayedInsights$;
  insightCategory = InsightCategory;

  constructor(private myInsightFacade: MyInsightFacade) {}

  ngOnInit() {
    this.myInsightFacade.getSentInsights();
  }

}

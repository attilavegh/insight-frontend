import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Insight, InsightCategory } from '@insight/shared-model';

import { MyInsightFacade } from '../+state/my-insight.facade';

@Component({
  selector: 'insight-my-insight-received',
  templateUrl: './my-insight-list.component.html',
  styleUrls: ['./my-insight-list.component.scss']
})
export class MyInsightListComponent implements OnInit {

  insights$: Observable<Insight[]> = this.myInsightFacade.displayedInsights$;
  category$: Observable<InsightCategory> = this.myInsightFacade.category$;

  constructor(private myInsightFacade: MyInsightFacade) {}

  ngOnInit() {}
}

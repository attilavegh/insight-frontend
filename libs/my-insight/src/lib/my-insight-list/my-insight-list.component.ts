import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { MyInsightFacade } from '../+state/my-insight.facade';

@Component({
  selector: 'insight-my-insight-received',
  templateUrl: './my-insight-list.component.html',
  styleUrls: ['./my-insight-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyInsightListComponent implements OnInit {

  insights$ = this.myInsightFacade.displayedInsights$;
  category$ = this.myInsightFacade.category$;
  loading$ = this.myInsightFacade.loading$;

  constructor(private myInsightFacade: MyInsightFacade) {}

  ngOnInit() {}
}

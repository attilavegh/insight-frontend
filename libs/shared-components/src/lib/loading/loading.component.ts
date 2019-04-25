import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'insight-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

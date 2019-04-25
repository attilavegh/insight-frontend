import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'insight-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  @Input()
  text = 'Button';

  @Input()
  type = 'button';

  @Input()
  disabled = false;

  constructor() {}

  ngOnInit() {}
}

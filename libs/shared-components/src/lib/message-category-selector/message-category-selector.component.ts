import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'insight-message-category-selector',
  templateUrl: './message-category-selector.component.html',
  styleUrls: ['./message-category-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageCategorySelectorComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
}

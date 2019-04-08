import { Component, Input } from '@angular/core';

@Component({
  selector: 'insight-message-container',
  templateUrl: './message-container.component.html',
  styleUrls: ['./message-container.component.scss']
})
export class MessageContainerComponent {

  @Input() message;

  constructor() {}
}

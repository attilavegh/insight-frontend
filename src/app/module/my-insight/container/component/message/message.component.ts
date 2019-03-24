import { Component, Input } from '@angular/core';

@Component({
  selector: 'insight-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {

  @Input() message;

  constructor() {}
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'insight-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input()
  text = 'Button';

  constructor() {}

  ngOnInit() {}
}

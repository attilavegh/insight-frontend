import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'insight-new-insight',
  templateUrl: './new-insight.component.html',
  styleUrls: ['./new-insight.component.scss']
})
export class NewInsightComponent implements OnInit {

  nameControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl('', [Validators.required]);
  continueControl = new FormControl('', [Validators.required]);
  considerControl = new FormControl('', [Validators.required]);

  form = new FormGroup({
    name: this.nameControl,
    type: this.typeControl,
    continue: this.continueControl,
    consider: this.considerControl
  });

  constructor() {}

  ngOnInit() {}

}

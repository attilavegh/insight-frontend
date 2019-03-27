import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { InsightType } from '../../../../shared/model/message/insight-type.model';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'insight-new-insight',
  templateUrl: './new-insight.component.html',
  styleUrls: ['./new-insight.component.scss']
})
export class NewInsightComponent implements OnInit, OnDestroy {

  typeControlSubscription: Subscription;

  userControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl(InsightType.CONTINUE, [Validators.required]);
  continueControl = new FormControl('', [Validators.required]);
  considerControl = new FormControl({ value: '', disabled: true }, [Validators.required]);

  form = new FormGroup({
    user: this.userControl,
    type: this.typeControl,
    continue: this.continueControl,
    consider: this.considerControl
  });

  constructor() {
  }

  ngOnInit() {
    this.typeControlSubscription = this.typeControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(this.onTypeControlChange.bind(this));
  }

  ngOnDestroy() {
    this.typeControlSubscription.unsubscribe();
  }

  onSubmit() {
    this.checkFormStatus();

    if (this.form.valid) {
      this.form.reset();
      console.log('submit');
    }
  }

  private checkFormStatus() {
    Object.keys(this.form.controls).forEach((key: string) => {
      this.form.get(key).markAsDirty();
      this.form.get(key).updateValueAndValidity();
    });
  }

  private onTypeControlChange(value: InsightType) {
    if (value === InsightType.CONSIDER) {
      this.considerControl.reset();
      this.considerControl.enable();
    } else {
      this.considerControl.disable();
    }
  }

  get isConsider() {
    return this.typeControl.value === InsightType.CONSIDER;
  }
}

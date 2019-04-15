import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { InsightType } from '@insight/shared-model';

import { Subscription } from 'rxjs';

import { NewInsightFacade } from '../+state/new-insight.facade';

@Component({
  selector: 'insight-new-insight',
  templateUrl: './new-insight.component.html',
  styleUrls: ['./new-insight.component.scss']
})
export class NewInsightComponent implements OnInit, OnDestroy {

  searchSubscription: Subscription;
  typeControlSubscription: Subscription;

  receiverControl = new FormControl('', [Validators.required]);
  typeControl = new FormControl(InsightType.CONTINUE, [Validators.required]);
  continueMessageControl = new FormControl('', [Validators.required]);
  considerMessageControl = new FormControl({ value: '', disabled: true }, [Validators.required]);

  form = new FormGroup({
    receiver: this.receiverControl,
    type: this.typeControl,
    continueMessage: this.continueMessageControl,
    considerMessage: this.considerMessageControl
  });

  isSearchLoading$ = this.newInsightFacade.searchLoading$;
  users$ = this.newInsightFacade.users$;

  constructor(private newInsightFacade: NewInsightFacade) {}

  ngOnInit() {
    this.searchSubscription = this.receiverControl.valueChanges.subscribe((name: string) => this.newInsightFacade.search(name));
    this.typeControlSubscription = this.typeControl.valueChanges.subscribe(this.onTypeControlChange.bind(this));
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
    this.typeControlSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.newInsightFacade.send(this.form.value);
      this.resetForm();
    } else {
      this.showErrors();
    }
  }

  private showErrors() {
    this.updateControls((control) => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }

  private resetForm() {
    this.form.reset();
    this.updateControls((control) => {
      control.markAsPristine();
      control.updateValueAndValidity();
    });
  }

  private updateControls(callbackFn: (control: AbstractControl) => void) {
    Object.keys(this.form.controls)
      .map((key: string) => this.form.get(key))
      .filter((control: FormControl) => control.enabled)
      .forEach((control: FormControl) => {
        callbackFn(control);
      });
  }

  private onTypeControlChange(value: InsightType) {
    if (value === InsightType.CONSIDER) {
      this.considerMessageControl.enable();
    } else {
      this.considerMessageControl.disable();
    }
  }

  get isConsider() {
    return this.typeControl && this.typeControl.value === InsightType.CONSIDER;
  }
}

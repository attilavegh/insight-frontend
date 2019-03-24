import { Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { InsightType } from '../../../../shared/model/message/insight-type.model';

@Component({
  selector: 'insight-type-selector',
  templateUrl: './insight-type-selector.component.html',
  styleUrls: ['./insight-type-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InsightTypeSelectorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InsightTypeSelectorComponent),
      multi: true
    }
  ]
})
export class InsightTypeSelectorComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @ViewChild('continue') continueButton: ElementRef;
  @ViewChild('consider') considerButton: ElementRef;

  continueClickSubscription: Subscription;
  considerClickSubscription: Subscription;

  private _value;

  onChange = (_: any) => {};

  constructor() {
  }

  ngOnInit() {
    this.continueClickSubscription = fromEvent(this.continueButton.nativeElement, 'click').pipe(
      tap(() => this.value = InsightType.CONTINUE)
    ).subscribe();

    this.considerClickSubscription = fromEvent(this.considerButton.nativeElement, 'click').pipe(
      tap(() => this.value = InsightType.CONSIDER),
    ).subscribe();
  }

  ngOnDestroy() {
    this.continueClickSubscription.unsubscribe();
    this.considerClickSubscription.unsubscribe();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  writeValue(value: any) {
    this.value = this.isValidInsightType(value) ? value : InsightType.CONTINUE;
  }

  validate(): ValidationErrors | null {
    return (!this.value) ? null : {valid: false};
  }

  private isValidInsightType(value: any) {
    return Object.values(InsightType).includes(value);
  }

  get isConsider() {
    return this.value === InsightType.CONSIDER;
  }

  get value() {
    return this._value;
  }

  set value(value: InsightType) {
    this._value = value;
    this.onChange(value);
  }
}

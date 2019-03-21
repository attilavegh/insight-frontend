import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { InsightType } from '../../../../shared/model/insight-type.model';

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
export class InsightTypeSelectorComponent implements ControlValueAccessor, Validator {

  private _value;

  onChange = (_: any) => {};

  constructor() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}

  writeValue(value: any) {
    this.value = this.isValidInsightType(value) ? value : InsightType.CONTINUE;
  }

  validate(): ValidationErrors | null {
    return (!this.value) ? null : { valid: false };
  }

  private isValidInsightType(value: any) {
    return Object.values(InsightType).includes(value);
  }

  onContinue() {
    this.value = InsightType.CONTINUE;
  }

  onConsider() {
    this.value = InsightType.CONSIDER;
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

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { InsightType } from '@insight/shared-model';

@Component({
  selector: 'insight-type-selector',
  templateUrl: './insight-type-selector.component.html',
  styleUrls: ['./insight-type-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
export class InsightTypeSelectorComponent implements OnInit, ControlValueAccessor, Validator {

  isSelectionChanged = false;
  isDisabled = false;

  private _value;

  onChange = (_: any) => {};

  constructor(private ref: ChangeDetectorRef) {}

  ngOnInit() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  writeValue(value: any) {
    this.value = this.isValidInsightType(value) ? value : InsightType.CONTINUE;
  }

  validate(): ValidationErrors | null {
    return (this.value) ? null : {valid: false};
  }

  setDisabledState(isDisabled: boolean) {
    this.ref.markForCheck();
    this.isDisabled = isDisabled;
  }

  onContinueButtonClick() {
    if (!this.isDisabled) {
      this.value = InsightType.CONTINUE;
    }
  }

  onConsiderButtonClick() {
    if (!this.isDisabled) {
      this.value = InsightType.CONSIDER;
    }
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
    this.isSelectionChanged = this._value !== value;
    this._value = value;
    this.onChange(value);
  }
}

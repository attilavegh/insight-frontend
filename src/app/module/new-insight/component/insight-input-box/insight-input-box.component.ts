import { Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Component({
  selector: 'insight-input-box',
  templateUrl: './insight-input-box.component.html',
  styleUrls: ['./insight-input-box.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InsightInputBoxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InsightInputBoxComponent),
      multi: true
    }
  ]
})
export class InsightInputBoxComponent implements ControlValueAccessor, Validator {

  @ViewChild('textarea') textarea: ElementRef;

  @Input() headerText;
  @Input() placeholder;

  _value: string;
  isValid = true;
  isFocused = false;
  isDisabled = false;

  onChange = (_: any) => {};

  constructor() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any) {
    this.value = obj;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.isValid = !control.dirty || control.value !== '';
    return (this.isValid) ? null : { valid: false };
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  onKeyup(value: string) {
    this.value = value;
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
  }
}

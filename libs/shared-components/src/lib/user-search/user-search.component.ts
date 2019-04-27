import { Component, ElementRef, forwardRef, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { EventCategory, User } from '@insight/shared-model';
import { AnalyticsService } from '@insight/shared-services';

@Component({
  selector: 'insight-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserSearchComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UserSearchComponent),
      multi: true
    }
  ]
})
export class UserSearchComponent implements OnInit, ControlValueAccessor, Validator {

  @ViewChild('searchField') searchField: ElementRef;

  @Input() users: User[];
  @Input() loading = false;

  selectedUser: User;

  isValid = true;
  isFocused = false;
  isDisabled = false;

  _value: any;

  onChange = (_: any) => {};

  constructor(private analytics: AnalyticsService) {}

  ngOnInit() {}

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  writeValue(value: any) {
    if (value == null) {
      this.selectedUser = null;
      this.searchFieldValue = null;
    }

    this.value = value;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.isValid = !control.dirty || (control.value !== '' && !!this.selectedUser);
    return (this.isValid) ? null : { valid: false };
  }

  onKeyup(value: string) {
    this.selectedUser = null;
    this.value = value;
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }

  selectUser(user: User) {
    this.analytics.log(EventCategory.SendInsight, 'selectUser');

    this.selectedUser = user;
    this.value = user.googleId;
    this.searchFieldValue = user.fullName;
  }

  set searchFieldValue(value: string) {
    this.searchField.nativeElement.value = value;
  }

  get value() {
    return this._value;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
  }
}

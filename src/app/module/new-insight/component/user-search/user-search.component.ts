import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User } from '../../../../shared/model/user/user.model';

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
export class UserSearchComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  @Input() users: Observable<User[]>;
  @Input() userCount: number;
  @Input() loading = false;

  selectedUser: User;

  @ViewChild('searchField') searchField: ElementRef;
  isValid = true;
  isFocused = false;

  elementEventSubscriptions: Subscription[] = [];
  _value: any;

  onChange = (_: any) => {};

  constructor() {}

  ngOnInit() {
    this.observeSearchChange();
    this.observeSearchFocus();
    this.observeSearchBlur();
  }

  ngOnDestroy(): void {
    this.elementEventSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
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

  observeSearchChange() {
    const valueChange = fromEvent(this.searchField.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      tap((value: string) => {
        this.selectedUser = null;
        this.value = value;
      })
    ).subscribe();

    this.elementEventSubscriptions.push(valueChange);
  }

  observeSearchFocus() {
    const focusSubscription = fromEvent(this.searchField.nativeElement, 'focus').pipe(
      tap(() => this.isFocused = true)
    ).subscribe();

    this.elementEventSubscriptions.push(focusSubscription);
  }

  observeSearchBlur() {
    const blurSubscription = fromEvent(this.searchField.nativeElement, 'blur').pipe(
      tap(() => this.isFocused = false)
    ).subscribe();

    this.elementEventSubscriptions.push(blurSubscription);
  }

  selectUser(user: User) {
    this.selectedUser = user;
    this.value = user;
    this.searchFieldValue = user.firstName + ' ' + user.lastName;
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

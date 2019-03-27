import { Component, ElementRef, forwardRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { User, userListMock } from '../../../../shared/model/user/user.model';

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
  hasValue = false;
  isValid = true;
  isFocused = false;

  elementEventSubscriptions: Subscription[] = [];
  _selectedUser: User;

  users = userListMock;

  onChange = (_: any) => {};

  constructor() {}

  ngOnInit() {
    this.observeSearchChange();
    this.observeSearchFocus();
    this.observeSearchBlur();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
  }

  setDisabledState(isDisabled: boolean) {
  }

  writeValue(user: User) {
    this.selectedUser = user;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    this.isValid = !control.dirty || (control.value !== '' && control.valid);
    return (this.isValid) ? null : { valid: false };
  }

  observeSearchChange() {
    const valueChange = fromEvent(this.searchField.nativeElement, 'keyup').pipe(
      distinctUntilChanged(),
      debounceTime(300),
      map((event: any) => event.target.value),
      tap((value: string) => this.hasValue = value !== '')
    ).subscribe();

    this.elementEventSubscriptions.push(valueChange);
  }

  observeSearchFocus() {
    const focusSubscription = fromEvent(this.searchField.nativeElement, 'focus').pipe(
      tap(() => {
        this.isFocused = true;
        this.selectedUser = null;
      })
    ).subscribe();

    this.elementEventSubscriptions.push(focusSubscription);
  }

  observeSearchBlur() {
    const blurSubscription = fromEvent(this.searchField.nativeElement, 'blur').pipe(
      tap(() => {
        this.isFocused = false;
        this.isValid = !(this.searchFieldValue !== '' && !this.selectedUser);
      })
    ).subscribe();

    this.elementEventSubscriptions.push(blurSubscription);
  }

  get searchFieldValue() {
    return this.searchField.nativeElement.value;
  }

  set searchFieldValue(value: string) {
    this.searchField.nativeElement.value = value;
  }

  get selectedUser() {
    return this._selectedUser;
  }

  set selectedUser(user: User) {
    this.onChange(user);
    this._selectedUser = user;

    this.hasValue = !!user;
    this.searchFieldValue = user ? user.name : '';
  }
}

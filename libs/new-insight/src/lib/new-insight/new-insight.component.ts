import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '@insight/shared-services';
import { InsightType, User } from '@insight/shared-model';

import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';

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
  considerControl = new FormControl({value: '', disabled: true}, [Validators.required]);

  form = new FormGroup({
    user: this.userControl,
    type: this.typeControl,
    continue: this.continueControl,
    consider: this.considerControl
  });

  users$ = new Observable<User[]>();
  userCount = 0;
  isSearchLoading = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.typeControlSubscription = this.typeControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe(this.onTypeControlChange.bind(this));

    this.users$ = this.userControl.valueChanges.pipe(
      filter(value => typeof value === 'string'),
      distinctUntilChanged(),
      debounceTime(300),
      tap(() => this.isSearchLoading = true),
      switchMap((value: string) => this.userService.search(value)),
      tap((users: User[]) => {
        this.isSearchLoading = false;
        this.userCount = users.length;
      })
    );
  }

  ngOnDestroy() {
    this.typeControlSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.form.valid) {
      this.resetForm();
      console.log('submit');
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
      this.considerControl.reset();
      this.considerControl.enable();
    } else {
      this.considerControl.disable();
    }
  }

  get isConsider() {
    return this.typeControl && this.typeControl.value === InsightType.CONSIDER;
  }
}

import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { MessageType } from '../../../../../shared/model/message/message-type.model';

@Component({
  selector: 'insight-message-type-selector',
  templateUrl: './message-type-selector.component.html',
  styleUrls: ['./message-type-selector.component.scss']
})
export class MessageTypeSelectorComponent implements OnInit, OnDestroy {

  @ViewChild('receivedButton') _receivedButtonElement: ElementRef;
  @ViewChild('sentButton') _sentButtonElement: ElementRef;

  @Output() messageTypeChange = new EventEmitter<MessageType>();

  selectedMessageType: MessageType = MessageType.RECEIVED;

  messageTypeChangeSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    this.observeTypeChange();
  }

  ngOnDestroy() {
    this.messageTypeChangeSubscription.unsubscribe();
  }

  observeTypeChange() {
    this.messageTypeChangeSubscription = fromEvent(this.sentButtonElement, 'click').pipe(
      tap(() => this.changeMessageType(MessageType.SENT)),
      switchMap(() => fromEvent(this.receivedButtonElement, 'click')),
      tap(() => this.changeMessageType(MessageType.RECEIVED)),
    ).subscribe();
  }

  changeMessageType(type: MessageType) {
    this.selectedMessageType = type;
    this.messageTypeChange.emit(type);
  }

  get receivedButtonElement() {
    return this._receivedButtonElement.nativeElement;
  }

  get sentButtonElement() {
    return this._sentButtonElement.nativeElement;
  }

  get isReceivedType() {
    return this.selectedMessageType === MessageType.RECEIVED;
  }

  get isSentType() {
    return this.selectedMessageType === MessageType.SENT;
  }
}

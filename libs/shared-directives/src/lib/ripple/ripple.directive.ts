import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[insightRipple]',
})
export class RippleDirective implements OnInit {
  private _trigger: HTMLElement;
  private directiveClassName = 'ripple-directive';
  private listener = (): void => {};

  constructor(
    public renderer: Renderer2,
    private el: ElementRef,
  ) {}

  private _disableRipple = false;

  @Input()
  get disableRipple() {
    return this._disableRipple;
  }

  set disableRipple(disableRipple: any) {
    this._disableRipple = disableRipple;
    this.setupTriggerEvents();
  }

  @Input('rippleTrigger')
  get trigger(): HTMLElement {
    return this._trigger || this.el.nativeElement;
  }

  set trigger(trigger: HTMLElement) {
    this._trigger = trigger;
    this.setupTriggerEvents();
  }

  ngOnInit() {
    this.trigger.classList.add(this.directiveClassName);
    if (this.trigger.tagName === 'BUTTON') {
      this.trigger.classList.add(this.directiveClassName + '--button');
    }

    this.setupTriggerEvents();
  }

  private createRipple(event: any) {
    const circle = this.renderer.createElement('div');

    const diameter = Math.max(this.trigger.clientHeight, this.trigger.clientWidth);
    circle.style.width = circle.style.height = `${diameter}px`;

    const rect = this.trigger.getBoundingClientRect();
    circle.style.left = `${event.clientX - rect.left - diameter / 2}px`;
    circle.style.top = `${event.clientY - rect.top - diameter / 2}px`;

    circle.classList.add(this.directiveClassName + '__circle');
    if (this.trigger.tagName === 'BUTTON') {
      circle.classList.add(this.directiveClassName + '--button__circle');
    }
    this.renderer.appendChild(this.trigger, circle);

    const circleRemover = (circleAdded: any) => {
      this.renderer.removeChild(this.trigger, circleAdded);
    };

    setTimeout(circleRemover.bind(this, circle), 1000);
  }

  private setupTriggerEvents() {
    if (!this.isDisabled()) {
      this.listener = this.renderer.listen(this.trigger, 'click', this.createRipple.bind(this));
    } else {
      this.listener();
    }
  }

  private isDisabled() {
    return this.disableRipple;
  }
}

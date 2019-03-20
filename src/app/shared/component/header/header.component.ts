import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { filter, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'insight-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isOpen = false;

  navigationSubscription: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      tap(() => this.isOpen = false)
    ).subscribe();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }


  onOpenChange(value: boolean) {
    this.isOpen = value;
  }
}

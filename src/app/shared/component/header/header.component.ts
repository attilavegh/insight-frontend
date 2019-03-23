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

  routeChangeSubscription: Subscription;

  isOpen = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.routeChangeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationStart),
      tap(() => this.isOpen = false)
    ).subscribe();
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerIconComponent } from './hamburger-icon.component';

describe('HamburgerIconComponent', () => {
  let component: HamburgerIconComponent;
  let fixture: ComponentFixture<HamburgerIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamburgerIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamburgerIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

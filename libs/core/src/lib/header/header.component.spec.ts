import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';

import { HamburgerIconComponent } from '../components/hamburger-icon/hamburger-icon.component';
import { HeaderDesktopComponent } from '../components/header-desktop/header-desktop.component';
import { HeaderMobileComponent } from '../components//header-mobile/header-mobile.component';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        HeaderDesktopComponent,
        HeaderMobileComponent,
        HamburgerIconComponent
      ],
      imports: [
        StoreModule.forRoot({}, {}),
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

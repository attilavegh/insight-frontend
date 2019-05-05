import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HamburgerIconComponent } from '../hamburger-icon/hamburger-icon.component';

import { HeaderMobileComponent } from './header-mobile.component';

describe('HeaderMobileComponent', () => {
  let component: HeaderMobileComponent;
  let fixture: ComponentFixture<HeaderMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderMobileComponent,
        HamburgerIconComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderMobileComponent);
    component = fixture.componentInstance;

    component.activePage = '';
    component.navigationLinks = {
      sendInsight: '',
      myInsights: ''
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

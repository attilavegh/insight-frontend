import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDesktopComponent } from './header-desktop.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderDesktopComponent', () => {
  let component: HeaderDesktopComponent;
  let fixture: ComponentFixture<HeaderDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HeaderDesktopComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderDesktopComponent);
    component = fixture.componentInstance;

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

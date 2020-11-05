import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOptionDetailsOverviewComponent } from './config-option-details-overview.component';

describe('ConfigOptionDetailsOverviewComponent', () => {
  let component: ConfigOptionDetailsOverviewComponent;
  let fixture: ComponentFixture<ConfigOptionDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigOptionDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOptionDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

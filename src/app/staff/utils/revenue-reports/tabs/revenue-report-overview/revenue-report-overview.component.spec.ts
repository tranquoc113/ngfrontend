import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueReportOverviewComponent } from './revenue-report-overview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RevenueReportOverviewComponent', () => {
  let component: RevenueReportOverviewComponent;
  let fixture: ComponentFixture<RevenueReportOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ RevenueReportOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueReportOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

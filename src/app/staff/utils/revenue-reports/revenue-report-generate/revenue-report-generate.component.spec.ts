import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueReportGenerateComponent } from './revenue-report-generate.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RevenueReportGenerateComponent', () => {
  let component: RevenueReportGenerateComponent;
  let fixture: ComponentFixture<RevenueReportGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ RevenueReportGenerateComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueReportGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

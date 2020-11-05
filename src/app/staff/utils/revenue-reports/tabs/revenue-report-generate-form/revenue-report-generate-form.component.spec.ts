import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueReportGenerateFormComponent } from './revenue-report-generate-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RevenueReportGenerateFormComponent', () => {
  let component: RevenueReportGenerateFormComponent;
  let fixture: ComponentFixture<RevenueReportGenerateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ RevenueReportGenerateFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueReportGenerateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

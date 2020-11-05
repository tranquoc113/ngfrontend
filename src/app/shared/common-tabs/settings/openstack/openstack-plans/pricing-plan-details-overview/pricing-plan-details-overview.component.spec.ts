import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlanDetailsOverviewComponent } from './pricing-plan-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PricingPlanDetailsOverviewComponent', () => {
  let component: PricingPlanDetailsOverviewComponent;
  let fixture: ComponentFixture<PricingPlanDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ PricingPlanDetailsOverviewComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPlanDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

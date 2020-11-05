import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlanEditFormComponent } from './pricing-plan-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ResellerPricingPlanEditFormComponent', () => {
  let component: PricingPlanEditFormComponent;
  let fixture: ComponentFixture<PricingPlanEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ PricingPlanEditFormComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatSelectModule, MatCheckboxModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPlanEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

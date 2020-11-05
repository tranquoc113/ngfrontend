import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingRuleEditFormComponent } from './pricing-rule-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PricingRuleEditFormComponent', () => {
  let component: PricingRuleEditFormComponent;
  let fixture: ComponentFixture<PricingRuleEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ PricingRuleEditFormComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, MatSelectModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingRuleEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

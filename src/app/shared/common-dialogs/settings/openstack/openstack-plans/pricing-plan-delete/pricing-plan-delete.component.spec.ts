import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingPlanDeleteComponent } from './pricing-plan-delete.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('PricingPlanDeleteComponent', () => {
  let component: PricingPlanDeleteComponent;
  let fixture: ComponentFixture<PricingPlanDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingPlanDeleteComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingPlanDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

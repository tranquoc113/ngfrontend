import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailsOverviewComponent } from './service-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ServiceDetailsOverviewComponent', () => {
  let component: ServiceDetailsOverviewComponent;
  let fixture: ComponentFixture<ServiceDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ServiceDetailsOverviewComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatDialogModule,],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

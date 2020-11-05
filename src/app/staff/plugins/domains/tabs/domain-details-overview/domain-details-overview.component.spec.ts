import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainDetailsOverviewComponent } from './domain-details-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DomainDetailsOverviewComponent', () => {
  let component: DomainDetailsOverviewComponent;
  let fixture: ComponentFixture<DomainDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ DomainDetailsOverviewComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

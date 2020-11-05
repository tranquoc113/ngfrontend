import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceChangeOptionsComponent } from './service-change-options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ServiceChangeOptionsComponent', () => {
  let component: ServiceChangeOptionsComponent;
  let fixture: ComponentFixture<ServiceChangeOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ServiceChangeOptionsComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
        RouterTestingModule, MatSelectModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceChangeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

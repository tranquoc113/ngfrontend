import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrencyDialogComponent } from './edit-currency-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('EditCurrencyDialogComponent', () => {
  let component: EditCurrencyDialogComponent;
  let fixture: ComponentFixture<EditCurrencyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCurrencyDialogComponent ],
      imports: [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, MatAutocompleteModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCurrencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

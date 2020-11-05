import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGroupEditFormComponent } from './product-group-edit-form.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ProductGroupEditFormComponent', () => {
  let component: ProductGroupEditFormComponent;
  let fixture: ComponentFixture<ProductGroupEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGroupEditFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGroupEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailsFlavorsAssignmentComponent } from './image-details-flavors-assignment.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ImageDetailsFlavorsAssignmentComponent', () => {
  let component: ImageDetailsFlavorsAssignmentComponent;
  let fixture: ComponentFixture<ImageDetailsFlavorsAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ImageDetailsFlavorsAssignmentComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule, MatDialogModule, MatSnackBarModule, MatTableModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailsFlavorsAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

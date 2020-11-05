import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditPropertiesFormComponent } from './image-edit-properties-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ImageEditPropertiesFormComponent', () => {
  let component: ImageEditPropertiesFormComponent;
  let fixture: ComponentFixture<ImageEditPropertiesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageEditPropertiesFormComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatSelectModule, MatCheckboxModule,
        MatSnackBarModule, MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageEditPropertiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingIpEditFormComponent } from './floating-ip-edit-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FloatingIpEditFormComponent', () => {
  let component: FloatingIpEditFormComponent;
  let fixture: ComponentFixture<FloatingIpEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingIpEditFormComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, MatSelectModule,
        MatAutocompleteModule, MatInputModule, MatDialogModule, NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingIpEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

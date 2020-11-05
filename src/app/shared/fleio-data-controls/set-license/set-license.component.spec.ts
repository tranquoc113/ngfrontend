import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLicenseComponent } from './set-license.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('SetLicenseComponent', () => {
  let component: SetLicenseComponent;
  let fixture: ComponentFixture<SetLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetLicenseComponent ],
      imports: [ HttpClientTestingModule, MatSnackBarModule, MatDialogModule ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

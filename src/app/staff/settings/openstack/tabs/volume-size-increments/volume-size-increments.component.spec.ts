import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeSizeIncrementsComponent } from './volume-size-increments.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('VolumeSizeIncrementsComponent', () => {
  let component: VolumeSizeIncrementsComponent;
  let fixture: ComponentFixture<VolumeSizeIncrementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeSizeIncrementsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSizeIncrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

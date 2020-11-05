import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultsComponent } from './defaults.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('DefaultsComponent', () => {
  let component: DefaultsComponent;
  let fixture: ComponentFixture<DefaultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultsComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

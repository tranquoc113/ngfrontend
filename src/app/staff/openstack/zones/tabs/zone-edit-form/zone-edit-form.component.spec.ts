import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneEditFormComponent } from './zone-edit-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ZoneEditFormComponent', () => {
  let component: ZoneEditFormComponent;
  let fixture: ComponentFixture<ZoneEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneEditFormComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatSnackBarModule, MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

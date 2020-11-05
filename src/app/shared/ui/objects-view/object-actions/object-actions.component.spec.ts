import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectActionsComponent } from './object-actions.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectActionsComponent', () => {
  let component: ObjectActionsComponent;
  let fixture: ComponentFixture<ObjectActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ObjectActionsComponent],
      imports: [MatSnackBarModule, MatDialogModule, RouterTestingModule, HttpClientTestingModule,],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

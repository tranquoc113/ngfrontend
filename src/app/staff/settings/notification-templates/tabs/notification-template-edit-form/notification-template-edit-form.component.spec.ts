import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTemplateEditFormComponent } from './notification-template-edit-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NotificationTemplateEditFormComponent', () => {
  let component: NotificationTemplateEditFormComponent;
  let fixture: ComponentFixture<NotificationTemplateEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ NotificationTemplateEditFormComponent ],
      imports: [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTemplateEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

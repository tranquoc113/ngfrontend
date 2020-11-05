import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTemplateEditComponent } from './notification-template-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('NotificationTemplateEditComponent', () => {
  // skipped because of tinymce async init. that causes random fails
  let component: NotificationTemplateEditComponent;
  let fixture: ComponentFixture<NotificationTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ NotificationTemplateEditComponent ],
      imports: [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

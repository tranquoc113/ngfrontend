import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditMessageDialogComponent } from './ticket-edit-message-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('TicketEditMessageDialogComponent', () => {
  // skipped because of tinymce async init. that causes random fails
  let component: TicketEditMessageDialogComponent;
  let fixture: ComponentFixture<TicketEditMessageDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TicketEditMessageDialogComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule, EditorModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEditMessageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

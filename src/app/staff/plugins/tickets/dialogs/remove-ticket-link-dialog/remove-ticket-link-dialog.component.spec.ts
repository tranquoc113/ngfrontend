import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTicketLinkDialogComponent } from './remove-ticket-link-dialog.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('RemoveTicketLinkDialogComponent', () => {
  let component: RemoveTicketLinkDialogComponent;
  let fixture: ComponentFixture<RemoveTicketLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ RemoveTicketLinkDialogComponent ],
      imports: [MatSnackBarModule, MatDialogModule, ReactiveFormsModule, HttpClientTestingModule, MatCheckboxModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTicketLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

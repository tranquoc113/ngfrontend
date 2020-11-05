import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsOpenNewComponent } from './tickets-open-new.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TicketsOpenNewComponent', () => {
  let component: TicketsOpenNewComponent;
  let fixture: ComponentFixture<TicketsOpenNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TicketsOpenNewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsOpenNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

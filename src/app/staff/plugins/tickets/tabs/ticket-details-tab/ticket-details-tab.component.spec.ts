import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsTabComponent } from './ticket-details-tab.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TicketDetailsTabComponent', () => {
  let component: TicketDetailsTabComponent;
  let fixture: ComponentFixture<TicketDetailsTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TicketDetailsTabComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, MatSnackBarModule, MatDialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

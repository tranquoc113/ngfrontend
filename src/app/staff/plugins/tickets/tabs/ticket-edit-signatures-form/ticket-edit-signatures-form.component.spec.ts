import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditSignaturesFormComponent } from './ticket-edit-signatures-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('TicketEditSignaturesFormComponent', () => {
  let component: TicketEditSignaturesFormComponent;
  let fixture: ComponentFixture<TicketEditSignaturesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEditSignaturesFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEditSignaturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

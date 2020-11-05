import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEditFormComponent } from './ticket-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TicketEditFormComponent', () => {
  let component: TicketEditFormComponent;
  let fixture: ComponentFixture<TicketEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketEditFormComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

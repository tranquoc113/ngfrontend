import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsSignaturesButtonComponent } from './tickets-signatures-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TicketsSignaturesButtonComponent', () => {
  let component: TicketsSignaturesButtonComponent;
  let fixture: ComponentFixture<TicketsSignaturesButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TicketsSignaturesButtonComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsSignaturesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsTicketsComponent } from './client-details-tickets.component';

describe('ClientDetailsTicketsComponent', () => {
  let component: ClientDetailsTicketsComponent;
  let fixture: ComponentFixture<ClientDetailsTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

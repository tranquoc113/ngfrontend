import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsDomainsComponent } from './client-details-domains.component';

describe('ClientDetailsDomainsComponent', () => {
  let component: ClientDetailsDomainsComponent;
  let fixture: ComponentFixture<ClientDetailsDomainsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsDomainsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsDomainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

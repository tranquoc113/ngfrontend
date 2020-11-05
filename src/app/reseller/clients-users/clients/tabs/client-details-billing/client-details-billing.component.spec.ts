import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsBillingComponent } from './client-details-billing.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientDetailsBillingComponent', () => {
  let component: ClientDetailsBillingComponent;
  let fixture: ComponentFixture<ClientDetailsBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsBillingComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

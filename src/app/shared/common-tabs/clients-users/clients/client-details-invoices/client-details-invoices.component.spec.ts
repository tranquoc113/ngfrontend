import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsInvoicesComponent } from './client-details-invoices.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientDetailsInvoicesComponent', () => {
  let component: ClientDetailsInvoicesComponent;
  let fixture: ComponentFixture<ClientDetailsInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsInvoicesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

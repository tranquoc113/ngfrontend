import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingHistoryOverviewComponent } from './billing-history-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BillingHistoryOverviewComponent', () => {
  let component: BillingHistoryOverviewComponent;
  let fixture: ComponentFixture<BillingHistoryOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingHistoryOverviewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingHistoryOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

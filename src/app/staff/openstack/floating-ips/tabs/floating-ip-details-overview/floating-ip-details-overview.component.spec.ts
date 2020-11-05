import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingIpDetailsOverviewComponent } from './floating-ip-details-overview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FloatingIpDetailsOverviewComponent', () => {
  let component: FloatingIpDetailsOverviewComponent;
  let fixture: ComponentFixture<FloatingIpDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingIpDetailsOverviewComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingIpDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

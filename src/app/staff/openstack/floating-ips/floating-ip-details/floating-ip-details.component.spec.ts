import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingIpDetailsComponent } from './floating-ip-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FloatingIpDetailsComponent', () => {
  let component: FloatingIpDetailsComponent;
  let fixture: ComponentFixture<FloatingIpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingIpDetailsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingIpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

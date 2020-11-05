import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsMetricsComponent } from './instance-details-metrics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsMetricsComponent', () => {
  let component: InstanceDetailsMetricsComponent;
  let fixture: ComponentFixture<InstanceDetailsMetricsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InstanceDetailsMetricsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

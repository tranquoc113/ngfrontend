import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsSystemLogComponent } from './instance-details-system-log.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsSystemLogComponent', () => {
  let component: InstanceDetailsSystemLogComponent;
  let fixture: ComponentFixture<InstanceDetailsSystemLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InstanceDetailsSystemLogComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsSystemLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

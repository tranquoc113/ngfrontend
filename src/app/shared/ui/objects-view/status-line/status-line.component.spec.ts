import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLineComponent } from './status-line.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StatusLineComponent', () => {
  let component: StatusLineComponent;
  let fixture: ComponentFixture<StatusLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ StatusLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

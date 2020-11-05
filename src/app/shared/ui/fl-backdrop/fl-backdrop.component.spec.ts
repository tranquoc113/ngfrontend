import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlBackdropComponent } from './fl-backdrop.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FlBackdropComponent', () => {
  let component: FlBackdropComponent;
  let fixture: ComponentFixture<FlBackdropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ FlBackdropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlBackdropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

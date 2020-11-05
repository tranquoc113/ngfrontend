import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCardComponent } from './object-card.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectCardComponent', () => {
  let component: ObjectCardComponent;
  let fixture: ComponentFixture<ObjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

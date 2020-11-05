import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GravatarComponent } from './gravatar.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('GravatarComponent', () => {
  let component: GravatarComponent;
  let fixture: ComponentFixture<GravatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ GravatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

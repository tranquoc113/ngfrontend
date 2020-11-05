import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerComponent } from './reseller.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ResellerComponent', () => {
  let component: ResellerComponent;
  let fixture: ComponentFixture<ResellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ResellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

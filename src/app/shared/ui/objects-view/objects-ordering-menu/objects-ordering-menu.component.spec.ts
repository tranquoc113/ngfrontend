import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsOrderingMenuComponent } from './objects-ordering-menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectsOrderingMenuComponent', () => {
  let component: ObjectsOrderingMenuComponent;
  let fixture: ComponentFixture<ObjectsOrderingMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectsOrderingMenuComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsOrderingMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

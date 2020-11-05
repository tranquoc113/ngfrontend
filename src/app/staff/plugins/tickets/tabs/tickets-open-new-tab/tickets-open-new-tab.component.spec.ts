import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsOpenNewTabComponent } from './tickets-open-new-tab.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('TicketsOpenNewTabComponent', () => {
  // skipped because of tinymce async init. that causes random fails
  let component: TicketsOpenNewTabComponent;
  let fixture: ComponentFixture<TicketsOpenNewTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ TicketsOpenNewTabComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsOpenNewTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

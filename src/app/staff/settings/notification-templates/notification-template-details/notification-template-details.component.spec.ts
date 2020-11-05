import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationTemplateDetailsComponent } from './notification-template-details.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NotificationTemplateDetailsComponent', () => {
  let component: NotificationTemplateDetailsComponent;
  let fixture: ComponentFixture<NotificationTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ NotificationTemplateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

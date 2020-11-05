import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppServicesStatusPanelComponent } from './app-services-status-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppServicesStatusPanelComponent', () => {
  let component: AppServicesStatusPanelComponent;
  let fixture: ComponentFixture<AppServicesStatusPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ AppServicesStatusPanelComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppServicesStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

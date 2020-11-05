import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGeneralComponent } from './settings-general.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SettingsGeneralComponent', () => {
  let component: SettingsGeneralComponent;
  let fixture: ComponentFixture<SettingsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ SettingsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

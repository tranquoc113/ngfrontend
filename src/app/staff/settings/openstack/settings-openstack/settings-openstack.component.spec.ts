import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOpenstackComponent } from './settings-openstack.component';

describe('SettingsOpenstackComponent', () => {
  let component: SettingsOpenstackComponent;
  let fixture: ComponentFixture<SettingsOpenstackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOpenstackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOpenstackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

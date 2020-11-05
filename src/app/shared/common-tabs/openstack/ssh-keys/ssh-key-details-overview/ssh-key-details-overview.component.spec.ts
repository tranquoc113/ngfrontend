import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SshKeyDetailsOverviewComponent } from './ssh-key-details-overview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SshKeyDetailsOverviewComponent', () => {
  let component: SshKeyDetailsOverviewComponent;
  let fixture: ComponentFixture<SshKeyDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ SshKeyDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SshKeyDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

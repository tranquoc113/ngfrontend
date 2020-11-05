import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileDetailsPanelComponent } from './user-profile-details-panel.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UserProfileDetailsPanelComponent', () => {
  let component: UserProfileDetailsPanelComponent;
  let fixture: ComponentFixture<UserProfileDetailsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ UserProfileDetailsPanelComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

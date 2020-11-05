import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserDetailsComponent } from './api-user-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApiUserDetailsComponent', () => {
  let component: ApiUserDetailsComponent;
  let fixture: ComponentFixture<ApiUserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ApiUserDetailsComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

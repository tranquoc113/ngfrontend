import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserEditComponent } from './api-user-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ApiUserEditComponent', () => {
  let component: ApiUserEditComponent;
  let fixture: ComponentFixture<ApiUserEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ApiUserEditComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

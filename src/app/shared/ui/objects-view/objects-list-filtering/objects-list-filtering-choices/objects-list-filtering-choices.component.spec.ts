import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsListFilteringChoicesComponent } from './objects-list-filtering-choices.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectsListFilteringChoicesComponent', () => {
  let component: ObjectsListFilteringChoicesComponent;
  let fixture: ComponentFixture<ObjectsListFilteringChoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectsListFilteringChoicesComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsListFilteringChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

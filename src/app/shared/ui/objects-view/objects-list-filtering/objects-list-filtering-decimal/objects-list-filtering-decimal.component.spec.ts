import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsListFilteringDecimalComponent } from './objects-list-filtering-decimal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectsListFilteringDecimalComponent', () => {
  let component: ObjectsListFilteringDecimalComponent;
  let fixture: ComponentFixture<ObjectsListFilteringDecimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectsListFilteringDecimalComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsListFilteringDecimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsListFilteringCustomModelComponent } from './objects-list-filtering-custom-model.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectsListFilteringCustomModelComponent', () => {
  let component: ObjectsListFilteringCustomModelComponent;
  let fixture: ComponentFixture<ObjectsListFilteringCustomModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectsListFilteringCustomModelComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule, MatAutocompleteModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsListFilteringCustomModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

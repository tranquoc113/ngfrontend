import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsListFilteringDisplayComponent } from './objects-list-filtering-display.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectsListFilteringDisplayComponent', () => {
  let component: ObjectsListFilteringDisplayComponent;
  let fixture: ComponentFixture<ObjectsListFilteringDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectsListFilteringDisplayComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsListFilteringDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

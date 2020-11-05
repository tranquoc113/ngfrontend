import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsListFilteringWildCardComponent } from './objects-list-filtering-wild-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ObjectsListFilteringWildCardComponent', () => {
  let component: ObjectsListFilteringWildCardComponent;
  let fixture: ComponentFixture<ObjectsListFilteringWildCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ObjectsListFilteringWildCardComponent ],
      imports: [RouterTestingModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectsListFilteringWildCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

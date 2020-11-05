import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsInProgressComponent } from './operations-in-progress.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('OperationsInProgressComponent', () => {
  let component: OperationsInProgressComponent;
  let fixture: ComponentFixture<OperationsInProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ OperationsInProgressComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationsInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

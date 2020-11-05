import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsVolumesComponent } from './instance-details-volumes.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsVolumesComponent', () => {
  let component: InstanceDetailsVolumesComponent;
  let fixture: ComponentFixture<InstanceDetailsVolumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InstanceDetailsVolumesComponent ],
      imports: [MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsVolumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

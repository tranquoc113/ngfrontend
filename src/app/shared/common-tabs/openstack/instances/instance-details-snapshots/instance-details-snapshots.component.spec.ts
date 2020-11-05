import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsSnapshotsComponent } from './instance-details-snapshots.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsSnapshotsComponent', () => {
  let component: InstanceDetailsSnapshotsComponent;
  let fixture: ComponentFixture<InstanceDetailsSnapshotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InstanceDetailsSnapshotsComponent ],
      imports: [MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsSnapshotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

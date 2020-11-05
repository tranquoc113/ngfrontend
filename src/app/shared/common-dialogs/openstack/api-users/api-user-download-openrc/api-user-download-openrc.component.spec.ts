import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserDownloadOpenrcComponent } from './api-user-download-openrc.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('ApiUserDownloadOpenrcComponent', () => {
  let component: ApiUserDownloadOpenrcComponent;
  let fixture: ComponentFixture<ApiUserDownloadOpenrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiUserDownloadOpenrcComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
      providers: [ {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUserDownloadOpenrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

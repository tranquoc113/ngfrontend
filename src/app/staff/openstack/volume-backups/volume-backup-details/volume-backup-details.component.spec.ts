import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeBackupDetailsComponent } from './volume-backup-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('VolumeBackupDetailsComponent', () => {
  let component: VolumeBackupDetailsComponent;
  let fixture: ComponentFixture<VolumeBackupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeBackupDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeBackupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

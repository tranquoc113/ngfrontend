import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeSnapshotDetailsComponent } from './volume-snapshot-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('VolumeSnapshotDetailsComponent', () => {
  let component: VolumeSnapshotDetailsComponent;
  let fixture: ComponentFixture<VolumeSnapshotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeSnapshotDetailsComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule, MatDialogModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSnapshotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

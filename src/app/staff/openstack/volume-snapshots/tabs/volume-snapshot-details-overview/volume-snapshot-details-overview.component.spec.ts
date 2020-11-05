import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeSnapshotDetailsOverviewComponent } from './volume-snapshot-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('VolumeSnapshotDetailsOverviewComponent', () => {
  let component: VolumeSnapshotDetailsOverviewComponent;
  let fixture: ComponentFixture<VolumeSnapshotDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeSnapshotDetailsOverviewComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeSnapshotDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

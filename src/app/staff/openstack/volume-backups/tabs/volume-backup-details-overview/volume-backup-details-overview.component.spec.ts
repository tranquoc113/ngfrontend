import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeBackupDetailsOverviewComponent } from './volume-backup-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UiModule } from '@shared/ui/ui.module';

describe('VolumeBackupDetailsOverviewComponent', () => {
  let component: VolumeBackupDetailsOverviewComponent;
  let fixture: ComponentFixture<VolumeBackupDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VolumeBackupDetailsOverviewComponent],
      imports: [
        HttpClientTestingModule, RouterTestingModule, UiModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeBackupDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

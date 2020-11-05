import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeDetailsOverviewComponent } from './volume-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VolumeDetailsOverviewComponent', () => {
  let component: VolumeDetailsOverviewComponent;
  let fixture: ComponentFixture<VolumeDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeDetailsOverviewComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

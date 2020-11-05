import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeDetailsComponent } from './volume-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('VolumeDetailsComponent', () => {
  let component: VolumeDetailsComponent;
  let fixture: ComponentFixture<VolumeDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

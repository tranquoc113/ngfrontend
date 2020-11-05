import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeEditComponent } from './volume-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('VolumeEditComponent', () => {
  let component: VolumeEditComponent;
  let fixture: ComponentFixture<VolumeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeEditComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneDetailsOverviewComponent } from './zone-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('ZoneDetailsOverviewComponent', () => {
  let component: ZoneDetailsOverviewComponent;
  let fixture: ComponentFixture<ZoneDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneDetailsOverviewComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatDialogModule, ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

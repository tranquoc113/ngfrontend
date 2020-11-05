import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SfaOptionsOverviewComponent } from './sfa-options-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('SfaOptionsOverviewComponent', () => {
  let component: SfaOptionsOverviewComponent;
  let fixture: ComponentFixture<SfaOptionsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SfaOptionsOverviewComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SfaOptionsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

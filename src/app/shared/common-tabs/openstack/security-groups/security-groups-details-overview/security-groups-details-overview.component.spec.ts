import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupsDetailsOverviewComponent } from './security-groups-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('SecurityGroupsDetailsOverviewComponent', () => {
  let component: SecurityGroupsDetailsOverviewComponent;
  let fixture: ComponentFixture<SecurityGroupsDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGroupsDetailsOverviewComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGroupsDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

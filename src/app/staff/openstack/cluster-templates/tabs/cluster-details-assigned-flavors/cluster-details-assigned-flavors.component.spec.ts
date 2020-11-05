import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDetailsAssignedFlavorsComponent } from './cluster-details-assigned-flavors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ClusterDetailsAssignedFlavorsComponent', () => {
  let component: ClusterDetailsAssignedFlavorsComponent;
  let fixture: ComponentFixture<ClusterDetailsAssignedFlavorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterDetailsAssignedFlavorsComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDetailsAssignedFlavorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

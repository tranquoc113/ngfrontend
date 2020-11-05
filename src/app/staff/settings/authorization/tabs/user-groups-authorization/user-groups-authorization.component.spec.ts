import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupsAuthorizationComponent } from './user-groups-authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('UserGroupsAuthorizationComponent', () => {
  let component: UserGroupsAuthorizationComponent;
  let fixture: ComponentFixture<UserGroupsAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupsAuthorizationComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule,
        MatAutocompleteModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupsAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAuthorizationComponent } from './users-authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

describe('UsersAuthorizationComponent', () => {
  let component: UsersAuthorizationComponent;
  let fixture: ComponentFixture<UsersAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAuthorizationComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule,
        MatAutocompleteModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

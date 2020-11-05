import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsGroupsComponent } from './user-details-groups.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('UserDetailsGroupsComponent', () => {
  let component: UserDetailsGroupsComponent;
  let fixture: ComponentFixture<UserDetailsGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsGroupsComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

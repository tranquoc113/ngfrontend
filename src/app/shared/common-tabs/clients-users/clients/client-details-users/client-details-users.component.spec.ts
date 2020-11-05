import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsUsersComponent } from './client-details-users.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ClientDetailsUsersComponent', () => {
  let component: ClientDetailsUsersComponent;
  let fixture: ComponentFixture<ClientDetailsUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsUsersComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsClientsComponent } from './user-details-clients.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserDetailsClientsComponent', () => {
  let component: UserDetailsClientsComponent;
  let fixture: ComponentFixture<UserDetailsClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsClientsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

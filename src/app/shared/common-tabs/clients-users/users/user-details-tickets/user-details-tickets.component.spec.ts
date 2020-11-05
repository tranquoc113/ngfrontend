import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsTicketsComponent } from './user-details-tickets.component';

describe('UserDetailsTicketsComponent', () => {
  let component: UserDetailsTicketsComponent;
  let fixture: ComponentFixture<UserDetailsTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

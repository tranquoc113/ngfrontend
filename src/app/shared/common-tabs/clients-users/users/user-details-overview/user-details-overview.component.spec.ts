import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsOverviewComponent } from './user-details-overview.component';

describe('UserDetailsOverviewComponent', () => {
  let component: UserDetailsOverviewComponent;
  let fixture: ComponentFixture<UserDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

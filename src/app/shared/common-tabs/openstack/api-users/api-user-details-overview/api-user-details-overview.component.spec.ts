import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiUserDetailsOverviewComponent } from './api-user-details-overview.component';

describe('ApiUserDetailsOverviewComponent', () => {
  let component: ApiUserDetailsOverviewComponent;
  let fixture: ComponentFixture<ApiUserDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiUserDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiUserDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

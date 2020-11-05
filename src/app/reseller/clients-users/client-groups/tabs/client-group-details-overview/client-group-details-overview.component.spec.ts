import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupDetailsOverviewComponent } from './client-group-details-overview.component';

describe('ClientGroupDetailsOverviewComponent', () => {
  let component: ClientGroupDetailsOverviewComponent;
  let fixture: ComponentFixture<ClientGroupDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

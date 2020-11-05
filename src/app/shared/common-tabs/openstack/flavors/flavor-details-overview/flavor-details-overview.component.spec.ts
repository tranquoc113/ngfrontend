import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorDetailsOverviewComponent } from './flavor-details-overview.component';

describe('FlavorDetailsOverviewComponent', () => {
  let component: FlavorDetailsOverviewComponent;
  let fixture: ComponentFixture<FlavorDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorDetailsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

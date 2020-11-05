import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetPoolDetailsOverviewComponent } from './subnet-pool-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SubnetPoolDetailsOverviewComponent', () => {
  let component: SubnetPoolDetailsOverviewComponent;
  let fixture: ComponentFixture<SubnetPoolDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ SubnetPoolDetailsOverviewComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetPoolDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

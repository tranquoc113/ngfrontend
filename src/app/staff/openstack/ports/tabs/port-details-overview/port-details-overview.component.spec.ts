import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortDetailsOverviewComponent } from './port-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PortDetailsOverviewComponent', () => {
  let component: PortDetailsOverviewComponent;
  let fixture: ComponentFixture<PortDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortDetailsOverviewComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

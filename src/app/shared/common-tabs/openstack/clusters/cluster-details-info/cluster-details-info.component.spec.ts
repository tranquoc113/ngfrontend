import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDetailsInfoComponent } from './cluster-details-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClusterDetailsInfoComponent', () => {
  let component: ClusterDetailsInfoComponent;
  let fixture: ComponentFixture<ClusterDetailsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterDetailsInfoComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDetailsNodesComponent } from './cluster-details-nodes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClusterDetailsNodesComponent', () => {
  let component: ClusterDetailsNodesComponent;
  let fixture: ComponentFixture<ClusterDetailsNodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterDetailsNodesComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDetailsNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

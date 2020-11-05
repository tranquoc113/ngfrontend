import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterDetailsLabelsComponent } from './cluster-details-labels.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClusterDetailsLabelsComponent', () => {
  let component: ClusterDetailsLabelsComponent;
  let fixture: ComponentFixture<ClusterDetailsLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterDetailsLabelsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterDetailsLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

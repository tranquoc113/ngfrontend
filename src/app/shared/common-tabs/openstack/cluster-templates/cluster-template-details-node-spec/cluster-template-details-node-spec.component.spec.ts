import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterTemplateDetailsNodeSpecComponent } from './cluster-template-details-node-spec.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClusterTemplateDetailsNodeSpecComponent', () => {
  let component: ClusterTemplateDetailsNodeSpecComponent;
  let fixture: ComponentFixture<ClusterTemplateDetailsNodeSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterTemplateDetailsNodeSpecComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterTemplateDetailsNodeSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

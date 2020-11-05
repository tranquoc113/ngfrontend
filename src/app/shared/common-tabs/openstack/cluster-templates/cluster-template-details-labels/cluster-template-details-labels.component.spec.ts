import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterTemplateDetailsLabelsComponent } from './cluster-template-details-labels.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClusterTemplateDetailsLabelsComponent', () => {
  let component: ClusterTemplateDetailsLabelsComponent;
  let fixture: ComponentFixture<ClusterTemplateDetailsLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterTemplateDetailsLabelsComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterTemplateDetailsLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

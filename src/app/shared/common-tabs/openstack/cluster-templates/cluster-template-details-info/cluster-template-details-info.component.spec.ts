import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterTemplateDetailsInfoComponent } from './cluster-template-details-info.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClusterTemplateDetailsInfoComponent', () => {
  let component: ClusterTemplateDetailsInfoComponent;
  let fixture: ComponentFixture<ClusterTemplateDetailsInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterTemplateDetailsInfoComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterTemplateDetailsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

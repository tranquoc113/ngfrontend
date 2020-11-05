import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterTemplateDetailsNetworkComponent } from './cluster-template-details-network.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClusterTemplateDetailsNetworkComponent', () => {
  let component: ClusterTemplateDetailsNetworkComponent;
  let fixture: ComponentFixture<ClusterTemplateDetailsNetworkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterTemplateDetailsNetworkComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterTemplateDetailsNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

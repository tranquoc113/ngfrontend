import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterTemplateDetailsComponent } from './cluster-template-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClusterTemplateDetailsComponent', () => {
  let component: ClusterTemplateDetailsComponent;
  let fixture: ComponentFixture<ClusterTemplateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterTemplateDetailsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterTemplateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

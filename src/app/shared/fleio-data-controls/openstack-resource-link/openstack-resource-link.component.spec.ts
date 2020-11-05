import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenstackResourceLinkComponent } from './openstack-resource-link.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OpenstackResourceLinkComponent', () => {
  let component: OpenstackResourceLinkComponent;
  let fixture: ComponentFixture<OpenstackResourceLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ OpenstackResourceLinkComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatButtonModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenstackResourceLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

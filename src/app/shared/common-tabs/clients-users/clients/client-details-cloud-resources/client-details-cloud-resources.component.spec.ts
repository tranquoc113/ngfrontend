import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsCloudResourcesComponent } from './client-details-cloud-resources.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ClientDetailsCloudResourcesComponent', () => {
  let component: ClientDetailsCloudResourcesComponent;
  let fixture: ComponentFixture<ClientDetailsCloudResourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ClientDetailsCloudResourcesComponent],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsCloudResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

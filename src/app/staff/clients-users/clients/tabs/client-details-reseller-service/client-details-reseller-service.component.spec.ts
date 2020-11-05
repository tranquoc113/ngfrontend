import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsResellerServiceComponent } from './client-details-reseller-service.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ClientDetailsResellerServiceComponent', () => {
  let component: ClientDetailsResellerServiceComponent;
  let fixture: ComponentFixture<ClientDetailsResellerServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ClientDetailsResellerServiceComponent ],
      imports: [HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsResellerServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

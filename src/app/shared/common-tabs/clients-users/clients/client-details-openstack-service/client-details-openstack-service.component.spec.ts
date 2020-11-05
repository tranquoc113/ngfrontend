import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsOpenstackServiceComponent } from './client-details-openstack-service.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ClientDetailsOpenstackServiceComponent', () => {
  let component: ClientDetailsOpenstackServiceComponent;
  let fixture: ComponentFixture<ClientDetailsOpenstackServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ ClientDetailsOpenstackServiceComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsOpenstackServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

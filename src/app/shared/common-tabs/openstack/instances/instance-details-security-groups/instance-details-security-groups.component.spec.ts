import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsSecurityGroupsComponent } from './instance-details-security-groups.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsSecurityGroupsComponent', () => {
  let component: InstanceDetailsSecurityGroupsComponent;
  let fixture: ComponentFixture<InstanceDetailsSecurityGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InstanceDetailsSecurityGroupsComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsSecurityGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

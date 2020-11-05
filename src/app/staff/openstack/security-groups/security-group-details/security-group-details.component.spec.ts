import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupDetailsComponent } from './security-group-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffSecurityGroupDetailsComponent', () => {
  let component: SecurityGroupDetailsComponent;
  let fixture: ComponentFixture<SecurityGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGroupDetailsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

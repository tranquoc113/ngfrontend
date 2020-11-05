import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupAddRuleComponent } from './security-group-add-rule.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SecurityGroupAddRuleComponent', () => {
  let component: SecurityGroupAddRuleComponent;
  let fixture: ComponentFixture<SecurityGroupAddRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityGroupAddRuleComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGroupAddRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkAddSubnetComponent } from './network-add-subnet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NetworkAddSubnetComponent', () => {
  let component: NetworkAddSubnetComponent;
  let fixture: ComponentFixture<NetworkAddSubnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NetworkAddSubnetComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkAddSubnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

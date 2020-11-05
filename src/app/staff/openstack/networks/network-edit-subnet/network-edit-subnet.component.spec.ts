import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkEditSubnetComponent } from './network-edit-subnet.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NetworkEditSubnetComponent', () => {
  let component: NetworkEditSubnetComponent;
  let fixture: ComponentFixture<NetworkEditSubnetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkEditSubnetComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkEditSubnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

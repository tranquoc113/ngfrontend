import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceBootFromIsoComponent } from './instance-boot-from-iso.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('StaffInstanceBootFromIsoComponent', () => {
  let component: InstanceBootFromIsoComponent;
  let fixture: ComponentFixture<InstanceBootFromIsoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstanceBootFromIsoComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceBootFromIsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenstackPluginConfigurationComponent } from './openstack-plugin-configuration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

describe('PluginConfigurationComponent', () => {
  let component: OpenstackPluginConfigurationComponent;
  let fixture: ComponentFixture<OpenstackPluginConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenstackPluginConfigurationComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatCheckboxModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenstackPluginConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

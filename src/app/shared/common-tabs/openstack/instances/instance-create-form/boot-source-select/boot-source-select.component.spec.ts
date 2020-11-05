import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootSourceSelectComponent } from './boot-source-select.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BootSourceSelectComponent', () => {
  let component: BootSourceSelectComponent;
  let fixture: ComponentFixture<BootSourceSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ BootSourceSelectComponent ],
      imports: [
        HttpClientTestingModule, MatSnackBarModule, MatDialogModule, NoopAnimationsModule, RouterTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootSourceSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

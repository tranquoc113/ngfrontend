import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorGroupEditFormComponent } from './flavor-group-edit-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FlavorGroupEditFormComponent', () => {
  let component: FlavorGroupEditFormComponent;
  let fixture: ComponentFixture<FlavorGroupEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorGroupEditFormComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatCheckboxModule, MatInputModule,
        NoopAnimationsModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorGroupEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

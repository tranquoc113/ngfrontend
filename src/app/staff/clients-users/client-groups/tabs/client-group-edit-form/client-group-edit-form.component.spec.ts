import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientGroupEditFormComponent } from './client-group-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClientGroupEditFormComponent', () => {
  let component: ClientGroupEditFormComponent;
  let fixture: ComponentFixture<ClientGroupEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientGroupEditFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatAutocompleteModule,
        MatCheckboxModule, MatSelectModule, MatInputModule, NoopAnimationsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientGroupEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailsOverviewComponent } from './contact-details-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContactDetailsOverviewComponent', () => {
  let component: ContactDetailsOverviewComponent;
  let fixture: ComponentFixture<ContactDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailsOverviewComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorGroupDetailsOverviewComponent } from './flavor-group-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('FlavorGroupDetailsOverviewComponent', () => {
  let component: FlavorGroupDetailsOverviewComponent;
  let fixture: ComponentFixture<FlavorGroupDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorGroupDetailsOverviewComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, MatInputModule, MatAutocompleteModule,
        MatSnackBarModule, MatDialogModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorGroupDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

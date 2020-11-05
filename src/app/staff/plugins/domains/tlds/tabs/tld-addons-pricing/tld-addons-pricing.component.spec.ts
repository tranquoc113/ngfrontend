import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TldAddonsPricingComponent } from './tld-addons-pricing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RouterTestingModule } from '@angular/router/testing';

describe('TldAddonsPricingComponent', () => {
  let component: TldAddonsPricingComponent;
  let fixture: ComponentFixture<TldAddonsPricingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TldAddonsPricingComponent ],
      imports: [
        ReactiveFormsModule, HttpClientTestingModule, MatSnackBarModule, MatDialogModule, MatAutocompleteModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TldAddonsPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

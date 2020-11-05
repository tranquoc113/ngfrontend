import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsConfOptsComponent } from './product-details-conf-opts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductDetailsConfOptsComponent', () => {
  let component: ProductDetailsConfOptsComponent;
  let fixture: ComponentFixture<ProductDetailsConfOptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsConfOptsComponent ],
      imports: [MatDialogModule, HttpClientTestingModule, MatSnackBarModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsConfOptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

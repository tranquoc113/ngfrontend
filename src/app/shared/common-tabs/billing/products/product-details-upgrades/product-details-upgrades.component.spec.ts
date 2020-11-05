import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsUpgradesComponent } from './product-details-upgrades.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('ProductDetailsUpgradesComponent', () => {
  let component: ProductDetailsUpgradesComponent;
  let fixture: ComponentFixture<ProductDetailsUpgradesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsUpgradesComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsUpgradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

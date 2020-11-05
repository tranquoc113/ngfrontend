import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsOverviewComponent } from './product-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ProductDetailsOverviewComponent', () => {
  let component: ProductDetailsOverviewComponent;
  let fixture: ComponentFixture<ProductDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailsOverviewComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

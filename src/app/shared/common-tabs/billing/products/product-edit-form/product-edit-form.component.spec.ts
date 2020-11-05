import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditFormComponent } from './product-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductEditFormComponent', () => {
  let component: ProductEditFormComponent;
  let fixture: ComponentFixture<ProductEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditFormComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule,]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

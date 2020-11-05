import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSettingsComponent } from './product-settings.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

xdescribe('CpanelserverProductSettingsComponent', () => {
  let component: ProductSettingsComponent;
  let fixture: ComponentFixture<ProductSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ProductSettingsComponent ],
      imports: [HttpClientTestingModule, MatSelectModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

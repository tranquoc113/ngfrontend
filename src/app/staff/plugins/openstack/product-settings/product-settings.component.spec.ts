import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSettingsComponent } from './product-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('OpenStackProductSettingsComponent', () => {
  let component: ProductSettingsComponent;
  let fixture: ComponentFixture<ProductSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSettingsComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatCheckboxModule, MatSelectModule,
        BrowserAnimationsModule]
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

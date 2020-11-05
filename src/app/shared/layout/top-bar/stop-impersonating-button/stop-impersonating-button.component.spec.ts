import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopImpersonatingButtonComponent } from './stop-impersonating-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StopImpersonatingButtonComponent', () => {
  let component: StopImpersonatingButtonComponent;
  let fixture: ComponentFixture<StopImpersonatingButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ StopImpersonatingButtonComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopImpersonatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

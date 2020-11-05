import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOptionEditFormComponent } from './config-option-edit-form.component';

describe('ConfigOptionEditFormComponent', () => {
  let component: ConfigOptionEditFormComponent;
  let fixture: ComponentFixture<ConfigOptionEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigOptionEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOptionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

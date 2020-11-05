import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigOptionEditComponent } from './config-option-edit.component';

describe('ConfigOptionEditComponent', () => {
  let component: ConfigOptionEditComponent;
  let fixture: ComponentFixture<ConfigOptionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigOptionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigOptionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

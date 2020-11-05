import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortEditComponent } from './port-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('PortEditComponent', () => {
  let component: PortEditComponent;
  let fixture: ComponentFixture<PortEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortEditComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

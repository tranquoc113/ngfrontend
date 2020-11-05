import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterAddInterfaceComponent } from './router-add-interface.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouterAddInterfaceComponent', () => {
  let component: RouterAddInterfaceComponent;
  let fixture: ComponentFixture<RouterAddInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterAddInterfaceComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterAddInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

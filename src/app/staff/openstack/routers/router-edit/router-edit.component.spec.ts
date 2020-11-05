import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterEditComponent } from './router-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RouterEditComponent', () => {
  let component: RouterEditComponent;
  let fixture: ComponentFixture<RouterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouterEditComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

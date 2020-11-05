import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserImpersonateComponent } from './user-impersonate.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserImpersonateComponent', () => {
  let component: UserImpersonateComponent;
  let fixture: ComponentFixture<UserImpersonateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserImpersonateComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserImpersonateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

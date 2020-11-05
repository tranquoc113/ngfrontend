import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTosComponent } from './new-tos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewTosComponent', () => {
  let component: NewTosComponent;
  let fixture: ComponentFixture<NewTosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTosComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

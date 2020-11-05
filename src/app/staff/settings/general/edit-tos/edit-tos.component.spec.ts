import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTosComponent } from './edit-tos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EditTosComponent', () => {
  let component: EditTosComponent;
  let fixture: ComponentFixture<EditTosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTosComponent],
      imports: [HttpClientTestingModule, RouterTestingModule,],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

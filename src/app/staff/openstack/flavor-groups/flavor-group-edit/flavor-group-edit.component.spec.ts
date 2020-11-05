import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorGroupEditComponent } from './flavor-group-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FlavorGroupEditComponent', () => {
  let component: FlavorGroupEditComponent;
  let fixture: ComponentFixture<FlavorGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorGroupEditComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

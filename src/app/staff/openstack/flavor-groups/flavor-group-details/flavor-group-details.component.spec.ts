import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorGroupDetailsComponent } from './flavor-group-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('FlavorGroupDetailsComponent', () => {
  let component: FlavorGroupDetailsComponent;
  let fixture: ComponentFixture<FlavorGroupDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorGroupDetailsComponent ],
      imports: [
        HttpClientTestingModule, RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorGroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

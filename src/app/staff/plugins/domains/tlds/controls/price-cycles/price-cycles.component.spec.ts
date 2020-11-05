import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceCyclesComponent } from './price-cycles.component';

describe('PriceCyclesComponent', () => {
  let component: PriceCyclesComponent;
  let fixture: ComponentFixture<PriceCyclesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceCyclesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceCyclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

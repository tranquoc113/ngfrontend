import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlavorsAsCardsComponent } from './flavors-as-cards.component';

describe('FlavorsAsCardsComponent', () => {
  let component: FlavorsAsCardsComponent;
  let fixture: ComponentFixture<FlavorsAsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlavorsAsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlavorsAsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

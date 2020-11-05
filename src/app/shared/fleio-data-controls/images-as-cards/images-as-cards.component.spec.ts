import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesAsCardsComponent } from './images-as-cards.component';

describe('ImagesAsCardsComponent', () => {
  let component: ImagesAsCardsComponent;
  let fixture: ComponentFixture<ImagesAsCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesAsCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesAsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

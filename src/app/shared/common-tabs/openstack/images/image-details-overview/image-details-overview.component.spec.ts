import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDetailsOverviewComponent } from './image-details-overview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ImageDetailsOverviewComponent', () => {
  let component: ImageDetailsOverviewComponent;
  let fixture: ComponentFixture<ImageDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDetailsOverviewComponent],
      imports: [HttpClientTestingModule,],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

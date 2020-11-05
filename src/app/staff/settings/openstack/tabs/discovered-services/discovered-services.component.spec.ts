import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveredServicesComponent } from './discovered-services.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

describe('DiscoveredServicesComponent', () => {
  let component: DiscoveredServicesComponent;
  let fixture: ComponentFixture<DiscoveredServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiscoveredServicesComponent],
      imports: [HttpClientTestingModule, MatSnackBarModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoveredServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

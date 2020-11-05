import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsServicesComponent } from './client-details-services.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientDetailsServicesComponent', () => {
  let component: ClientDetailsServicesComponent;
  let fixture: ComponentFixture<ClientDetailsServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsServicesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

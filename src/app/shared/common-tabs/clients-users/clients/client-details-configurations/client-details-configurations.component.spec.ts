import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsConfigurationsComponent } from './client-details-configurations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ClientDetailsConfigurationsComponent', () => {
  let component: ClientDetailsConfigurationsComponent;
  let fixture: ComponentFixture<ClientDetailsConfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsConfigurationsComponent ],
      imports: [HttpClientTestingModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkDetailsOverviewComponent } from './network-details-overview.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UiModule } from '@shared/ui/ui.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NetworkDetailsOverviewComponent', () => {
  let component: NetworkDetailsOverviewComponent;
  let fixture: ComponentFixture<NetworkDetailsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ NetworkDetailsOverviewComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, MatDialogModule, MatSnackBarModule, UiModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkDetailsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

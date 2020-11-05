import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceDetailsHistoryLogComponent } from './instance-details-history-log.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InstanceDetailsHistoryLogComponent', () => {
  let component: InstanceDetailsHistoryLogComponent;
  let fixture: ComponentFixture<InstanceDetailsHistoryLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ InstanceDetailsHistoryLogComponent ],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstanceDetailsHistoryLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

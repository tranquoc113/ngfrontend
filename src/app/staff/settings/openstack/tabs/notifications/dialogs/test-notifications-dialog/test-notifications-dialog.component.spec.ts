import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestNotificationsDialogComponent } from './test-notifications-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('TestNotificationsDialogComponent', () => {
  let component: TestNotificationsDialogComponent;
  let fixture: ComponentFixture<TestNotificationsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestNotificationsDialogComponent ],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestNotificationsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

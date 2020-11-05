import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCredentialsDialogComponent } from './test-credentials-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('TestCredentialsDialogComponent', () => {
  let component: TestCredentialsDialogComponent;
  let fixture: ComponentFixture<TestCredentialsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestCredentialsDialogComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
      providers: [{provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}}],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCredentialsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

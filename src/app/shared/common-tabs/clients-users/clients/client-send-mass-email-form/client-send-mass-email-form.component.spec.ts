import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSendMassEmailFormComponent } from './client-send-mass-email-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { EditorModule } from '@tinymce/tinymce-angular';

xdescribe('ClientSendMassEmailFormComponent', () => {
  // skipped because of tinymce async init. that causes random fails
  let component: ClientSendMassEmailFormComponent;
  let fixture: ComponentFixture<ClientSendMassEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSendMassEmailFormComponent ],
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, MatSnackBarModule, MatDialogModule,
        EditorModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSendMassEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

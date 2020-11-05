import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPluginNotificationsComponent } from './todo-plugin-notifications.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('TodoPluginNotificationsComponent', () => {
  let component: TodoPluginNotificationsComponent;
  let fixture: ComponentFixture<TodoPluginNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoPluginNotificationsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule, MatSnackBarModule, MatDialogModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoPluginNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

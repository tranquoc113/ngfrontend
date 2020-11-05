import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsPluginNotificationsComponent } from './tickets-plugin-notifications.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

describe('TicketsPluginNotificationsComponent', () => {
  let component: TicketsPluginNotificationsComponent;
  let fixture: ComponentFixture<TicketsPluginNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsPluginNotificationsComponent ],
      imports: [HttpClientTestingModule, HttpClientTestingModule, RouterTestingModule, MatSnackBarModule,
        MatDialogModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsPluginNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

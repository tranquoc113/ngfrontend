import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisconnectedFromServerComponent } from './disconnected-from-server.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DisconnectedFromServerComponent', () => {
  let component: DisconnectedFromServerComponent;
  let fixture: ComponentFixture<DisconnectedFromServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisconnectedFromServerComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisconnectedFromServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

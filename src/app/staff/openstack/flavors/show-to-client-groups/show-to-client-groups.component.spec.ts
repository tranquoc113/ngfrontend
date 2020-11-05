import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowToClientGroupsComponent } from './show-to-client-groups.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StaffShowToClientGroupsComponent', () => {
  let component: ShowToClientGroupsComponent;
  let fixture: ComponentFixture<ShowToClientGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowToClientGroupsComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowToClientGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

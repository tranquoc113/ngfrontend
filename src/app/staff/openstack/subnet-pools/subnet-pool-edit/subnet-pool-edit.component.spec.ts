import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetPoolEditComponent } from './subnet-pool-edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubnetPoolEditComponent', () => {
  let component: SubnetPoolEditComponent;
  let fixture: ComponentFixture<SubnetPoolEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetPoolEditComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetPoolEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

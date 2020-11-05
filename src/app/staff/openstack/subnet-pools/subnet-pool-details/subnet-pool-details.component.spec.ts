import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubnetPoolDetailsComponent } from './subnet-pool-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SubnetPoolDetailsComponent', () => {
  let component: SubnetPoolDetailsComponent;
  let fixture: ComponentFixture<SubnetPoolDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubnetPoolDetailsComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule,],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubnetPoolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

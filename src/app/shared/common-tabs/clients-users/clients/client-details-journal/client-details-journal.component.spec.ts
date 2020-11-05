import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailsJournalComponent } from './client-details-journal.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientDetailsJournalComponent', () => {
  let component: ClientDetailsJournalComponent;
  let fixture: ComponentFixture<ClientDetailsJournalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientDetailsJournalComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetailsJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

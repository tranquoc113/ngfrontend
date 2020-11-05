import { TestBed } from '@angular/core/testing';

import { ClientGroupListUIService } from './client-group-list-ui.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ClientGroupListUiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: ClientGroupListUIService = TestBed.get(ClientGroupListUIService);
    expect(service).toBeTruthy();
  });
});

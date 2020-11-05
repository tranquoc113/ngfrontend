import { TestBed } from '@angular/core/testing';

import { AppLocalStorageService } from './app-local-storage.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppLocalStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [HttpClientTestingModule, RouterTestingModule]
  }));

  it('should be created', () => {
    const service: AppLocalStorageService = TestBed.get(AppLocalStorageService);
    expect(service).toBeTruthy();
  });
});

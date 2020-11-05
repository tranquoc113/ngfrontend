import { TestBed } from '@angular/core/testing';

import { UiFeaturesService } from './ui-features.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('UiFeaturesService', () => {
  let service: UiFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [HttpClientTestingModule, RouterTestingModule],
    });
    service = TestBed.inject(UiFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ThemingService } from './theming.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ThemingService', () => {
  let service: ThemingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ThemingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

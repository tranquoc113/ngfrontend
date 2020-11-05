import { TestBed } from '@angular/core/testing';

import { ClipboardService } from './clipboard.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ClipboardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  }));

  it('should be created', () => {
    const service: ClipboardService = TestBed.get(ClipboardService);
    expect(service).toBeTruthy();
  });
});

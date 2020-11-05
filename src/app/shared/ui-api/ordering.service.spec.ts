import { TestBed } from '@angular/core/testing';

import { OrderingService } from './ordering.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OrderingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [RouterTestingModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: OrderingService = TestBed.get(OrderingService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { FilteringService } from './filtering.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('FilteringService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    imports: [RouterTestingModule, MatSnackBarModule, MatDialogModule, HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: FilteringService = TestBed.get(FilteringService);
    expect(service).toBeTruthy();
  });
});

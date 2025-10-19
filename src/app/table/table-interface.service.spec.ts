import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing' 

import { TableInterfaceService } from './table-interface.service';

describe('TableInterfaceService', () => {
  let service: TableInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    const httpTesting = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TableInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

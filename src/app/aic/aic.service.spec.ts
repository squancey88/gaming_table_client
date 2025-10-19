import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing' 

import { AICService } from './aic.service';

describe('AICService', () => {
  let service: AICService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AICService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

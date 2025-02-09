import { TestBed } from '@angular/core/testing';

import { AicApiService } from './aic-api.service';

describe('ApiServiceService', () => {
  let service: AicApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

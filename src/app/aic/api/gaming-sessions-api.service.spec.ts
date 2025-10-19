import { TestBed } from '@angular/core/testing';

import { GamingSessionsApiService } from './gaming-sessions-api.service';

describe('GamingSessionsApiService', () => {
  let service: GamingSessionsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamingSessionsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

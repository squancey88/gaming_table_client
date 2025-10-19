import { TestBed } from '@angular/core/testing';

import { GamingGroupsApiService } from './gaming-groups-api.service';

describe('GamingGroupsApiService', () => {
  let service: GamingGroupsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamingGroupsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

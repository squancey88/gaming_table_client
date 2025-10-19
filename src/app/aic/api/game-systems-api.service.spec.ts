import { TestBed } from '@angular/core/testing';

import { GameSystemsApiService } from './game-systems-api.service';

describe('GameSystemsApiService', () => {
  let service: GameSystemsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSystemsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { AICService } from './aic.service';

describe('AICService', () => {
  let service: AICService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AICService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TableConfigService } from './table-config.service';

describe('ConfigService', () => {
  let service: TableConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

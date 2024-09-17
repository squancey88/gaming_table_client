import { TestBed } from '@angular/core/testing';

import { TableInterfaceService } from './table-interface.service';

describe('TableInterfaceService', () => {
  let service: TableInterfaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableInterfaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LightControllerFormsService } from './light-controller-forms.service';

describe('LightControllerFormsService', () => {
  let service: LightControllerFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightControllerFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

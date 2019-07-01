import { TestBed } from '@angular/core/testing';

import { CirclService } from './circl.service';

describe('CirclService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CirclService = TestBed.get(CirclService);
    expect(service).toBeTruthy();
  });
});

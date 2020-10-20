import { TestBed } from '@angular/core/testing';

import { HangoutService } from './hangout.service';

describe('HangoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HangoutService = TestBed.get(HangoutService);
    expect(service).toBeTruthy();
  });
});

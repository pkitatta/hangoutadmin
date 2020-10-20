import { TestBed } from '@angular/core/testing';

import { HangoutResolverService } from './hangout-resolver.service';

describe('HangoutResolverService', () => {
  let service: HangoutResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HangoutResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { HangoutDataService } from './hangout-data.service';

describe('HangoutDataService', () => {
  let service: HangoutDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HangoutDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { LoadingProviderService } from './loading-provider.service';

describe('LoadingProviderService', () => {
  let service: LoadingProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

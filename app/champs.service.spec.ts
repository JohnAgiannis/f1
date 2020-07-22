import { TestBed } from '@angular/core/testing';

import { ChampsService } from './champs.service';

describe('ChampsService', () => {
  let service: ChampsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

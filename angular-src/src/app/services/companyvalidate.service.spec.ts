/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyvalidateService } from './companyvalidate.service';

describe('CompanyvalidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyvalidateService]
    });
  });

  it('should ...', inject([CompanyvalidateService], (service: CompanyvalidateService) => {
    expect(service).toBeTruthy();
  }));
});

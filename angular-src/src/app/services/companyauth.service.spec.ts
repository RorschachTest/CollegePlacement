/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanyauthService } from './companyauth.service';

describe('CompanyauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyauthService]
    });
  });

  it('should ...', inject([CompanyauthService], (service: CompanyauthService) => {
    expect(service).toBeTruthy();
  }));
});

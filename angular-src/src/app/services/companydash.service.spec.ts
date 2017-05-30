/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CompanydashService } from './companydash.service';

describe('CompanydashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanydashService]
    });
  });

  it('should ...', inject([CompanydashService], (service: CompanydashService) => {
    expect(service).toBeTruthy();
  }));
});

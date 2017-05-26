/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentauthService } from './studentauth.service';

describe('StudentauthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentauthService]
    });
  });

  it('should ...', inject([StudentauthService], (service: StudentauthService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentprofileService } from './studentprofile.service';

describe('StudentprofileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentprofileService]
    });
  });

  it('should ...', inject([StudentprofileService], (service: StudentprofileService) => {
    expect(service).toBeTruthy();
  }));
});

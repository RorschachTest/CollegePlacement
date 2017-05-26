/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StudentvalidateService } from './studentvalidate.service';

describe('StudentvalidateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentvalidateService]
    });
  });

  it('should ...', inject([StudentvalidateService], (service: StudentvalidateService) => {
    expect(service).toBeTruthy();
  }));
});

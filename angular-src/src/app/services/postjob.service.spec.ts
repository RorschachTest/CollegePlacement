/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostjobService } from './postjob.service';

describe('PostjobService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostjobService]
    });
  });

  it('should ...', inject([PostjobService], (service: PostjobService) => {
    expect(service).toBeTruthy();
  }));
});

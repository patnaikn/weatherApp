/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PassdataService } from './passdata.service';

describe('PassdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassdataService]
    });
  });

  it('should ...', inject([PassdataService], (service: PassdataService) => {
    expect(service).toBeTruthy();
  }));
});

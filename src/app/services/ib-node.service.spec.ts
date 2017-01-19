/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IbNodeService } from './ib-node.service';

describe('IbNodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IbNodeService]
    });
  });

  it('should ...', inject([IbNodeService], (service: IbNodeService) => {
    expect(service).toBeTruthy();
  }));
});

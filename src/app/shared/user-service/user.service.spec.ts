/* tslint:disable:no-unused-variable */

import {  async, inject } from '@angular/core/testing';
import { UserService } from './user.service';

describe('Service: User', () => {
  beforeEach(() => {
  });

  it('should ...',
    inject([UserService],
      (service: UserService) => {
        expect(service).toBeTruthy();
      }));
});

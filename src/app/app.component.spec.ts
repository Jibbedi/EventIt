/* tslint:disable:no-unused-variable */

import { async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('App: EventIt', () => {
  beforeEach(() => {
    // addProviders([AppComponent]);
  });

  it('should create the app',
    inject([AppComponent], (app: AppComponent) => {
      expect(app).toBeTruthy();
    }));
});

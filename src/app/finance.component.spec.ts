import {beforeEachProviders, describe, expect, it, inject} from '@angular/core/testing';
import {FinanceAppComponent} from '../app/finance.component';

beforeEachProviders(() => [FinanceAppComponent]);

describe('App: Finance', () => {
  it('should create the app',
     inject([FinanceAppComponent], (app: FinanceAppComponent) => { expect(app).toBeTruthy(); }));

  it('should have as title \'finance works!\'',
     inject([FinanceAppComponent], (app: FinanceAppComponent) => {
       expect(app.title).toEqual('finance works!');
     }));
});

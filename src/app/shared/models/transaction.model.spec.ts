import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {Account} from './account.model';
import {Category} from './category.model';
import {Transaction} from './transaction.model';

describe('Transaction', () => {
  let t;

  beforeEach(() => {
    t = {
      value: 32.43,
      description: 'description',
      accountUuid: '1',
      accountName: 'account name',
      categoryUuid: '2',
      categoryName: 'category name',
      categoryType: 'credit',
      date: '2010-03-01',
      propertyUuid: 1
    };
  });

  it('should create with constructor parameters', () => {
    var transaction = new Transaction(null, t.propertyUuid, t.value, t.description, t.date,
      t.accountUuid, t.accountName,
      t.categoryUuid, t.categoryName, t.categoryType);

    expect(transaction.value).toEqual(t.value);
    expect(transaction.description).toEqual(t.description);
    expect(transaction.date).toEqual(new Date(2010, 2, 1));
    expect(transaction.propertyUuid).toEqual(t.propertyUuid);
    expect(transaction.accountName).toEqual(t.accountName);
    expect(transaction.categoryName).toEqual(t.categoryName);
  });
});

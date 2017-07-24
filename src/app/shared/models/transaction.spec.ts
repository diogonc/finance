/* tslint:disable:no-unused-variable */
import { Transaction } from './transaction';
import { Account } from './account';
import { Category } from './category';

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
    let transaction = new Transaction(null, t.propertyUuid, t.value, t.description, t.date,
      new Account(t.accountUuid, t.accountName, 1), new Category(t.categoryUuid, t.categoryName, t.categoryType, 1));

    expect(transaction.value).toEqual(t.value);
    expect(transaction.description).toEqual(t.description);
    expect(transaction.date).toEqual(new Date(2010, 2, 1));
    expect(transaction.propertyUuid).toEqual(t.propertyUuid);
    expect(transaction.account.name).toEqual(t.accountName);
    expect(transaction.category.name).toEqual(t.categoryName);
  });

  it('should fill error if fieds are not filled', () => {
    let transaction = new Transaction(null, null, 0, '', null, null, null);

    expect(transaction.isValid()).toEqual(false);
    expect(transaction.errors.length).toEqual(6);
  });
});

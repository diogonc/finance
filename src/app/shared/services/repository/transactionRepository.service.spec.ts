import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {TransactionRepository} from './transactionRepository.service';

describe('Repository', () => {
  let repository;

  beforeEach(() => {
    repository = new TransactionRepository();
    repository.deleteAll();

    var transactions = [
      createTransaction(12, '1005', '13', new Date(2010, 0, 3)),
      createTransaction(12, '1004', '14', new Date(2010, 0, 2)),
      createTransaction(12, '1004', '15', new Date(2010, 0, 1))
    ];

    repository.saveAll(transactions);
  });

  it('should filter by category', () => {
    var result = repository.getFiltered('1004', '', null, null);

    expect(result[0].categoryUuid).toEqual('1004');
  });

  it('should filter by account', () => {
    var result = repository.getFiltered('', '15', null, null);

    expect(result[0].accountUuid).toEqual('15');
  });

  it('should filter by date', () => {
    var initialDate = new Date(2010, 0, 1);
    var finalDate = new Date(2010, 0, 1);
    var result = repository.getFiltered('', '', initialDate, finalDate);

    expect(result[0].date).toEqual(initialDate);
  });
});

function createTransaction(
    value: number, categoryUuid: string, accountUuid: string, date: Date): Object {
  return {
    uuid: '00ff14a5-2ab9-4e71-8b82-5be7a206f73d',
    propertyUuid: '1',
    payed: '1',
    date: date,
    description: 'Cafe',
    value: 12.9,
    categoryUuid: categoryUuid,
    categoryName: 'Extra',
    categoryType: 'debit',
    accountUuid: accountUuid,
    accountName: 'NuBank',
    createdAt: '2016-01-18 17:59:50',
    updatedAt: '2016-01-18 17:59:50',
    id: '56a4ce2616f4263493d8a6d1'
  };
}

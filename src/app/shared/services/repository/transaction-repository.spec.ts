/* tslint:disable:no-unused-variable */
import { TransactionRepository } from './transaction-repository';

describe('Repository', () => {
  let repository;

  beforeEach(() => {
    repository = new TransactionRepository();
    repository.deleteAll();

    const transactions = [
      createTransaction(12, '1004', '15', new Date(2010, 0, 1)),
      createTransaction(15, '1004', '14', new Date(2010, 0, 2)),
      createTransaction(11, '1005', '13', new Date(2010, 0, 3))
    ];
    repository.saveAll(transactions);
  });

  it('should filter by category', () => {
    const result = repository.getFiltered(['1004'], [], null, null, '', null);

    expect(result[0].category.uuid).toEqual('1004');
  });

  it('should filter by account', () => {
    const result = repository.getFiltered([], ['15'], null, null, '', null);

    expect(result[0].account.uuid).toEqual('15');
  });

  it('should return empty if thereis no account', () => {
    const result = repository.getFiltered([], ['10'], null, null, '', null);

    expect(result.length).toEqual(0);
  });

  it('should filter by date', () => {
    const initialDate = new Date(2010, 0, 1);
    const finalDate = new Date(2010, 0, 1);
    const result = repository.getFiltered([], [], initialDate, finalDate, '', null);

    expect(result[0].date).toEqual(initialDate);
  });

  it('should order by date desc', () => {
    const result = repository.getFiltered([], [], null, null, '', null);

    expect(result[0].date).toEqual(new Date(2010, 0, 3));
  });

  it('should order by value desc', () => {
    const result = repository.getFiltered([], [], null, null, '', 'value');

    expect(result[0].value).toEqual(15);
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
    value: value,
    category: { uuid: categoryUuid, name: 'Extra', categoryType: 'debit' },
    account: { uuid: accountUuid, name: 'Nubank' },
    createdAt: '2016-01-18 17:59:50',
    updatedAt: '2016-01-18 17:59:50',
    id: '56a4ce2616f4263493d8a6d1'
  };
}

/* tslint:disable:no-unused-variable */
import {Sync} from './sync';
import {User} from '../../models/user';

describe('Sync', () => {
  let accountRepository;
  let categoryRepository;
  let transactionRepository;
  let financeApi;
  let sync;
  let user;

  beforeEach(() => {
    accountRepository = new GenericRepository();
    categoryRepository = new GenericRepository();
    transactionRepository = new GenericRepository();
    financeApi = new FinanceApi();

    user = new User('login', 'pass');
    sync = new Sync(financeApi, accountRepository, categoryRepository, transactionRepository);
  });

  it('should call apis on sync', () => {
    sync.getAllDataFromServer(user, () => user.login = 'tes');

    expect(financeApi.accountsCalled).toEqual(true);
    expect(financeApi.categoriesCalled).toEqual(true);
    expect(financeApi.transactionsCalled).toEqual(true);
  });

  it('should execute success if api return true', () => {
    let called = false;
    let callback = () => { called = true; };

    sync.getAllDataFromServer(user, callback);

    expect(called).toEqual(true);
  });

  it('should delete all local data', () => {
    sync.deleteAllLocalData();
  });
});

class GenericRepository {
  public called: boolean = false;
  public deletedCalled: boolean = false;

  saveAll(user: any): void { this.called = true; }

  deleteAll(): void { this.deletedCalled = true; }
}

class FinanceApi {
  public accountsCalled: boolean = false;
  public categoriesCalled: boolean = false;
  public transactionsCalled: boolean = false;

  getAccounts(user: any, success: (data: any) => any): void {
    this.accountsCalled = true;
    success({_body: []});
  }

  getCategories(user: any, success: (data: any) => any): void {
    this.categoriesCalled = true;
    success({_body: []});
  }

  getTransactions(user: any, success: (data: any) => any): void {
    this.transactionsCalled = true;
    let transactionFromServer = '[{' +
        '\"accountName\": \"NuBank\",' +
        '\"accountUuid\": \"13\",' +
        '\"categoryName\": \"Extra\",' +
        '\"categoryType\": \"debit\",' +
        '\"categoryUuid\": \"1004\",' +
        '\"createdAt\": \"2016-01-18 17:59:50\",' +
        '\"date\": \"2016-01-17\",' +
        '\"description\": \"Cafe\",' +
        '\"id\": \"56a4ce2616f4263493d8a6d1\",' +
        '\"payed\": \"1\",' +
        '\"propertyUuid\": \"1\",' +
        '\"updatedAt\": \"2016-01-18 17:59:50\",' +
        '\"uuid\": \"00ff14a5-2ab9-4e71-8b82-5be7a206f73d\",' +
        '\"value\": 12.9' +
        '}]';
    success({_body: transactionFromServer});
  }
}

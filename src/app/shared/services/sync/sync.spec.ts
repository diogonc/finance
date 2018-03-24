/* tslint:disable:no-unused-variable */
import { Sync } from './sync';
import { User } from '../../models/user';
import { OwnerRepository } from '../repository/owner-repository';

describe('Sync', () => {
  let accountRepository;
  let ownerRepository;
  let categoryRepository;
  let groupRepository;
  let transactionRepository;
  let financeApi;
  let sync;
  let user;

  beforeEach(() => {
    accountRepository = new GenericRepository();
    ownerRepository = new GenericRepository();
    categoryRepository = new GenericRepository();
    groupRepository = new GenericRepository();
    transactionRepository = new GenericRepository();
    financeApi = new FinanceApi();

    user = new User('login', 'pass');
    sync = new Sync(financeApi, accountRepository, ownerRepository, categoryRepository, groupRepository, transactionRepository);
  });

  it('should call apis on sync', () => {
    sync.getAllDataFromServer(user, () => user.login = 'tes');

    expect(financeApi.accountsCalled).toEqual(true);
    expect(financeApi.categoriesCalled).toEqual(true);
    expect(financeApi.groupsCalled).toEqual(true);
    expect(financeApi.transactionsCalled).toEqual(true);
  });

  it('should delete all local data', () => {
    sync.deleteAllLocalData();
  });
});

class GenericRepository {
  public called = false;
  public deletedCalled = false;

  saveAll(user: any): void { this.called = true; }

  deleteAll(): void { this.deletedCalled = true; }
}

class FinanceApi {
  public accountsCalled = false;
  public ownersCalled = false;
  public categoriesCalled = false;
  public groupsCalled = false;
  public transactionsCalled = false;

  getAccounts(user: any, success: (data: any) => any): void {
    this.accountsCalled = true;
    // success([]);
  }

  getOwners(user: any, success: (data: any) => any): void {
    this.ownersCalled = true;
    // success([]);
  }

  getCategories(user: any, success: (data: any) => any): void {
    this.categoriesCalled = true;
    // success([]);
  }

  getGroups(user: any, success: (data: any) => any): void {
    this.groupsCalled = true;
    // success([]);
  }

  getTransactions(user: any, success: (data: any) => any): void {
    this.transactionsCalled = true;
    const transactionFromServer = '[{' +
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
    // success(transactionFromServer);
  }
}

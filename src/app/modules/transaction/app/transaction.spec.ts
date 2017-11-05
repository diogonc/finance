import { TransactionApp } from './transaction';

describe('TransactionApp', () => {
  let transactionApp;
  let userRepository;
  let transactionRepository;
  let api;

  beforeEach(() => {
    userRepository = new UserRepository();
    transactionRepository = new TransactionRepository();
    api = new Api();

    transactionApp = new TransactionApp(transactionRepository, userRepository, api);
  });

  it('should test', () => {
    expect(true).toEqual(true);
  });
});

class UserRepository {
  public getUserCalled: boolean = false;

  getUser(user: any): void { this.getUserCalled = true; }
}

class TransactionRepository {
  public saveCalled: boolean = false;

  save(user: any): void { this.saveCalled = true; }
}

class Api {
  public saveTransactionCalled: boolean = false;

  saveTransaction(user: any): void { this.saveTransactionCalled = true; }
}

class Sha1 {
}

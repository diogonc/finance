import {TransactionApp} from './transaction';

describe('TransactionApp', () => {
  let transactionApp;
  let userRepository;
  let transactionRepository;
  let api;
  let loadEvent;

  beforeEach(() => {
    userRepository = new UserRepository();
    transactionRepository = new TransactionRepository();
    api = new Api();
    loadEvent = new LoadEvent();

    transactionApp = new TransactionApp(transactionRepository, userRepository, api, loadEvent);
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

class LoadEvent {
  public announceLoadStartCalled: boolean = false;

  announceLoadStart(user: any): void { this.announceLoadStartCalled = true; }
}

import {Injectable} from '@angular/core';
import {TransactionRepository} from '../../services/repository/transaction-repository';
import {UserRepository} from '../../services/repository/user-repository';
import {MyDate} from '../../util/my-date';
import {MyArray} from '../../util/my-array';
import {FinanceApi} from '../../services/api/finance-api';
import {Account} from '../../models/account';
import {Category} from '../../models/category';
import {Transaction} from '../../models/transaction';
import {LoadEvent} from '../../events/load-event';
import {TransactionVm} from './transaction-vm';

@Injectable()
export class TransactionApp {
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private api: FinanceApi;
  private loadEvent: LoadEvent;

  constructor(transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi, loadEvent: LoadEvent) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
    this.api = api;
    this.loadEvent = loadEvent;
  }

  load(uuid: string, accounts: Array<Account>, categories: Array<Category>) {
    let user = this.userRepository.getUser();

    if (typeof (uuid) !== 'undefined' && uuid !== null) {
      let transaction = this.transactionRepository.get(uuid);
      return this.createTransactionVm(transaction, accounts, categories);
    }
    return new TransactionVm(null, 0, '',
      MyDate.convertToUsString(new Date()),
      user.property, 0, 0);
  }

  save(transactionVm: TransactionVm, account: Account, category: Category,
    onSuccess: () => void,
    onError: (error) => void):
    void {
    let user = this.userRepository.getUser();
    let transaction = new Transaction(transactionVm.uuid, user.property, transactionVm.value,
      transactionVm.description,
      transactionVm.date, account.uuid, account.name,
      category.uuid, category.name, category.type);

    if (!transaction.isValid()) {
      onError(transaction.errors);
      return;
    }

    this.loadEvent.announceLoadStart('start');
    if (transactionVm.uuid === null) {
      this.api.saveTransaction(transaction, user,
        () => this.onSave(transaction, onSuccess));
    } else {
      this.api.updateTransaction(transaction, user,
        () => this.onSave(transaction, onSuccess));
    }
  };

  delete(uuid: string, onSuccess: () => void) {
    if (uuid === null) {
      return;
    }
    let user = this.userRepository.getUser();
    this.loadEvent.announceLoadStart('start');
    this.api.deleteTransaction(uuid, user,
      () => this.onDelete(uuid, onSuccess));
  };

  private createTransactionVm(transaction: Transaction, accounts: Array<Account>, categories: Array<Category>):
    TransactionVm {
    let accountIndex = 0;
    let categoryIndex = 0;

    if (transaction.accountUuid !== null) {
      accountIndex = MyArray.findIndex(transaction.accountUuid, accounts);
    }

    if (transaction.categoryUuid !== null) {
      categoryIndex = MyArray.findIndex(transaction.categoryUuid, categories);
    }
    return new TransactionVm(transaction.uuid, transaction.value, transaction.description,
      MyDate.convertToUsString(transaction.date), transaction.propertyUuid,
      accountIndex, categoryIndex);
  };

  private onSave(transaction: Transaction, onSuccess: () => void) {
    this.transactionRepository.save(transaction);
    onSuccess();
    this.loadEvent.announceLoadEnd('finish');
  };

  private onDelete(transactionUuid: string, onSuccess: () => void) {
    this.transactionRepository.delete(transactionUuid);
    this.loadEvent.announceLoadEnd('finish');
    onSuccess();
  };
}

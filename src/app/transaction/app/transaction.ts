import { Injectable } from '@angular/core';
import { TransactionRepository } from '../../shared/services/repository/transaction-repository';
import { UserRepository } from '../../shared/services/repository/user-repository';
import { MyDate } from '../../shared/util/my-date';
import { MyArray } from '../../shared/util/my-array';
import { FinanceApi } from '../../shared/services/api/finance-api';
import { Account } from '../../shared/models/account';
import { Category } from '../../shared/models/category';
import { Transaction } from '../../shared/models/transaction';
import { TransactionVm } from './transaction-vm';

@Injectable()
export class TransactionApp {
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private api: FinanceApi;

  constructor(transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
    this.api = api;
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
    const user = this.userRepository.getUser();
    const transaction = new Transaction(transactionVm.uuid, user.property, transactionVm.value,
      transactionVm.description,
      transactionVm.date, account,
      category);

    if (!transaction.isValid()) {
      onError(transaction.errors);
      return;
    }

    if (transactionVm.uuid === null) {
      this.api.saveTransaction(transaction, user,
        (response) => {
          transaction.uuid = response._body;
          this.onSave(transaction, onSuccess);
        },
        onError);
    } else {
      this.api.updateTransaction(transaction, user,
        () => this.onSave(transaction, onSuccess),
        onError);
    }
  };

  delete(uuid: string, onSuccess: () => void, onError: () => void) {
    if (uuid === null) {
      return;
    }
    const user = this.userRepository.getUser();
    this.api.deleteTransaction(uuid, user,
      () => this.onDelete(uuid, onSuccess),
      onError);
  };

  private createTransactionVm(transaction: Transaction, accounts: Array<Account>, categories: Array<Category>):
    TransactionVm {
    let accountIndex = 0;
    let categoryIndex = 0;

    if (transaction.account.uuid !== null) {
      accountIndex = MyArray.findIndex(transaction.account.uuid, accounts);
    }

    if (transaction.category.uuid !== null) {
      categoryIndex = MyArray.findIndex(transaction.category.uuid, categories);
    }
    return new TransactionVm(transaction.uuid, transaction.value, transaction.description,
      MyDate.convertToUsString(transaction.date), transaction.propertyUuid,
      accountIndex, categoryIndex);
  };

  private onSave(transaction: Transaction, onSuccess: () => void) 
  {
    this.transactionRepository.save(transaction);
    onSuccess();
  };

  private onDelete(transactionUuid: string, onSuccess: () => void) {
    this.transactionRepository.delete(transactionUuid);
    onSuccess();
  };
}

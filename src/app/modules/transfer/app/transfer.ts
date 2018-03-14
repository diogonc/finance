import { Injectable } from '@angular/core';
import { TransactionRepository } from '../../../shared/services/repository/transaction-repository';
import { UserRepository } from '../../../shared/services/repository/user-repository';
import { FinanceApi } from '../../../shared/services/api/finance-api';
import { Account } from '../../../shared/models/account';
import { Category } from '../../../shared/models/category';
import { Transaction } from '../../../shared/models/transaction';
import { TransferVm } from './transfer-vm';

@Injectable()
export class TransferApp {

  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private api: FinanceApi;
  private finished: boolean;

  constructor(transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
    this.api = api;
  }

  save(transferVm: TransferVm, fromAccount: Account, toAccount: Account,
    creditCategory: Category, debitCategory: Category,
    onSuccess: () => void,
    onError: (error) => void):
    void {

    const user = this.userRepository.getUser();

    const fromTransaction = new Transaction(null, user.property, transferVm.value, transferVm.description
                                            , transferVm.date, fromAccount, debitCategory);

    const toTransaction = new Transaction(null, user.property, transferVm.value, transferVm.description
                                          , transferVm.date, toAccount, creditCategory);

    if (!fromTransaction.isValid() || !toTransaction.isValid()) {
      const errors = fromTransaction.errors;
      toTransaction.errors.map(error => errors.push(error));
      onError(errors);
      return;
    }

    this.finished = false;
    this.api.saveTransaction(fromTransaction,
      (response) => this.onSave(fromTransaction, onSuccess, response),
      onError);
    this.api.saveTransaction(toTransaction,
      (response) => this.onSave(toTransaction, onSuccess, response),
      onError);
  }

  private onSave(transaction: Transaction, onSuccess: () => void, response: any) {
    transaction.uuid = response.uuid;
    this.transactionRepository.save(transaction);

    if (this.finished) {
      onSuccess();
    } else {
      this.finished = true;
    }
  }
}

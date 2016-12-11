import {Injectable} from '@angular/core';
import {TransactionRepository} from '../../shared/services/repository/transaction-repository';
import {UserRepository} from '../../shared/services/repository/user-repository';
import {FinanceApi} from '../../shared/services/api/finance-api';
import {Account} from '../../shared/models/account';
import {Category} from '../../shared/models/category';
import {Transaction} from '../../shared/models/transaction';
import {TransferVm} from './transfer-vm';

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

    let user = this.userRepository.getUser();

    let fromTransaction = new Transaction(null, user.property, transferVm.value, transferVm.description,
      transferVm.date, fromAccount.uuid, fromAccount.name,
      debitCategory.uuid, debitCategory.name, debitCategory.type);

    let toTransaction = new Transaction(null, user.property, transferVm.value, transferVm.description,
      transferVm.date, toAccount.uuid, toAccount.name,
      creditCategory.uuid, creditCategory.name, creditCategory.type);

    if (!fromTransaction.isValid() || !toTransaction.isValid()) {
      let errors = fromTransaction.errors;
      toTransaction.errors.map(error => errors.push(error));
      onError(errors);
      return;
    }

    this.finished = false;
    this.api.saveTransaction(fromTransaction, user,
      () => this.onSave(fromTransaction, onSuccess),
      onError);
    this.api.saveTransaction(toTransaction, user,
      () => this.onSave(toTransaction, onSuccess),
      onError);
  };

  private onSave(transaction: Transaction, onSuccess: () => void) {
    this.transactionRepository.save(transaction);

    if (this.finished) {
      onSuccess();
    } else {
      this.finished = true;
    }
  };
}

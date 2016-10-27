import {Injectable} from '@angular/core';
import {TransactionRepository} from '../../services/repository/transaction-repository';
import {UserRepository} from '../../services/repository/user-repository';
import {FinanceApi} from '../../services/api/finance-api';
import {Account} from '../../models/account';
import {Category} from '../../models/category';
import {Transaction} from '../../models/transaction';
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
      () => this.onSave(fromTransaction, onSuccess));
    this.api.saveTransaction(toTransaction, user,
      () => this.onSave(toTransaction, onSuccess));
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

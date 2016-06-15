import {Injectable} from '@angular/core';
import {TransactionRepository} from '../../services/repository/transaction-repository.service';
import {UserRepository} from '../../services/repository/user-repository.service';
import {FinanceApi} from '../../services/api/finance-api.service';
import {Account} from '../../models/account.model';
import {Category} from '../../models/category.model';
import {Transaction} from '../../models/transaction.model';
import {LoadEvent} from '../../events/load.event';
import {TransferVm} from './transfer-vm';

@Injectable()
export class TransferApp {

  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private api: FinanceApi;
  private loadEvent: LoadEvent;
  private finished: boolean;

  constructor(transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi, loadEvent: LoadEvent) {
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
    this.api = api;
    this.loadEvent = loadEvent;
  }

  save(transferVm: TransferVm, fromAccount: Account, toAccount: Account,
    creditCategory: Category, debitCategory: Category,
    onSuccess: () => void,
    onError: (error) => void):
    void {

    var user = this.userRepository.getUser();

    var fromTransaction = new Transaction(null, user.property, transferVm.value, transferVm.description,
      transferVm.date, fromAccount.uuid, fromAccount.name,
      debitCategory.uuid, debitCategory.name, debitCategory.type);

    var toTransaction = new Transaction(null, user.property, transferVm.value, transferVm.description,
      transferVm.date, toAccount.uuid, toAccount.name,
      creditCategory.uuid, creditCategory.name, creditCategory.type);

    if (!fromTransaction.isValid() || !toTransaction.isValid()) {
      var errors = fromTransaction.errors;
      toTransaction.errors.map(error => errors.push(error));
      onError(errors);
      return;
    }

    this.loadEvent.announceLoadStart('start');

    this.finished = false;
    this.api.saveTransaction(fromTransaction, user,
      () => this.onSave(fromTransaction, onSuccess));
    this.api.saveTransaction(toTransaction, user,
      () => this.onSave(toTransaction, onSuccess));
  };

  private onSave(transaction: Transaction, onSuccess: () => void) {
    this.transactionRepository.save(transaction);

    if (this.finished) {
      this.loadEvent.announceLoadEnd('finish');
      onSuccess();
    } else {
      this.finished = true;
    }

  };
}

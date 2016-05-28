import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouteSegment, Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/accountRepository.service';
import {CategoryRepository} from '../shared/services/repository/categoryRepository.service';
import {TransactionRepository} from '../shared/services/repository/transactionRepository.service';
import {UserRepository} from '../shared/services/repository/userRepository.service';
import {DateService} from '../shared/services/date/date.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Transaction} from '../shared/models/transaction.model';
import {User} from '../shared/models/user.model';

@Component({
  moduleId: module.id,
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [
    AccountRepository, CategoryRepository, TransactionRepository, UserRepository, DateService,
    FinanceApi
  ]
})
export class TransactionComponent implements OnInit {
  public accounts: Array<any>;
  public categories: Array<any>;
  public transactions: Array<Transaction>;
  public transactionVm: TransactionVm;

  private _user: User;
  private _accountRepository: AccountRepository;
  private _categoryRepository: CategoryRepository;
  private _transactionRepository: TransactionRepository;
  private _userRepository: UserRepository;
  private _dateService: DateService;
  private _api: FinanceApi;
  private _params: RouteSegment;
  private _router: Router;

  constructor(
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    transactionRepository: TransactionRepository, userRepository: UserRepository,
    dateService: DateService, api: FinanceApi, params: RouteSegment, router: Router) {
    this._accountRepository = accountRepository;
    this._categoryRepository = categoryRepository;
    this._transactionRepository = transactionRepository;
    this._userRepository = userRepository;
    this._dateService = dateService;
    this._api = api;
    this._params = params;
    this._router = router;
  }

  ngOnInit() {
    this.accounts = this._accountRepository.getAll();
    this.categories = this._categoryRepository.getAll();
    this._user = this._userRepository.getUser();

    var uuid = this._params.getParam('id');
    if (typeof (uuid) !== 'undefined') {
      var transaction = this._transactionRepository.get(uuid);
      this.transactionVm = this.createTransactionVm(transaction);
      return;
    }
    this.transactionVm = new TransactionVm(null, 0, '',
      this._dateService.convertToUsString(new Date()),
      this._user.property, 0, 0);
  }

  save() {
    var accountvm = this.accounts[this.transactionVm.accountIndex];
    var categoryVm = this.categories[this.transactionVm.categoryIndex];

    var t = this.transactionVm;
    var transaction = new Transaction(t.uuid, this._user.property, t.value, t.description,
      this._dateService.convertToDateFromString(t.date), accountvm.uuid, accountvm.name,
      categoryVm.uuid, categoryVm.name, categoryVm.categoryType);

    if (t.uuid === null) {
      this._api.saveTransaction(transaction, this._user,
        () => this.onSave(transaction));
    } else {
      this._api.updateTransaction(transaction, this._user,
        () => this.onSave(transaction));
    }
  };

  delete() {
    this._api.deleteTransaction(this.transactionVm.uuid, this._user,
      () => this.onDelete(this.transactionVm.uuid));
  };

  private createTransactionVm(transaction: Transaction):
    TransactionVm {
    var accountIndex = 0;
    var categoryIndex = 0;

    if (transaction.accountUuid !== null) {
      accountIndex = this.findIndex(transaction.accountUuid, this.accounts);
    }

    if (transaction.categoryUuid !== null) {
      categoryIndex = this.findIndex(transaction.categoryUuid, this.categories);
    }
    return new TransactionVm(transaction.uuid, transaction.value, transaction.description,
      this._dateService.convertToUsString(transaction.date), transaction.propertyUuid,
      accountIndex, categoryIndex);
  };

  // TODO: colocar em um lugar melhor
  private findIndex(key: string, data: any): number {
    var length = data.length;
    for (var i = 0; i < length; i++) {
      if (data[i].uuid === key) {
        return i;
      }
    }
    return -1;
  };

  private onSave(transaction: Transaction) {
    this._transactionRepository.save(transaction);
    this._router.navigate(['/transaction-list']);
  };

  private onDelete(transactionUuid: string) {
    this._transactionRepository.delete(transactionUuid);
    this._router.navigate(['/transaction-list']);
  };
}

class TransactionVm {
  uuid: string;
  value: number;
  description: string;
  date: string;
  propertyUuid: string;
  accountIndex: number;
  categoryIndex: number;

  constructor(uuid: string, value: number, description: string, date: string, propertyUuid: string,
    accounIndex: number, categoryIndex: number) {
    this.uuid = uuid;
    this.value = value;
    this.description = description;
    this.date = date;
    this.propertyUuid = propertyUuid;
    this.accountIndex = accounIndex;
    this.categoryIndex = categoryIndex;
  }
}
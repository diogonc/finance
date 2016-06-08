import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouteSegment, Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/accountRepository.service';
import {CategoryRepository} from '../shared/services/repository/categoryRepository.service';
import {TransactionRepository} from '../shared/services/repository/transactionRepository.service';
import {UserRepository} from '../shared/services/repository/userRepository.service';
import {MyDate} from '../shared/util/my-date';
import {MyArray} from '../shared/util/my-array';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Account} from '../shared/models/account.model';
import {Category} from '../shared/models/category.model';
import {Transaction} from '../shared/models/transaction.model';
import {User} from '../shared/models/user.model';
import {LoadEvent} from '../shared/events/load.event';

@Component({
  moduleId: module.id,
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [
    AccountRepository, CategoryRepository, TransactionRepository, UserRepository, MyDate,
    FinanceApi
  ]
})
export class TransactionComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;
  public transactionVm: TransactionVm;
  public errors: Array<string>;

  private _user: User;
  private _accountRepository: AccountRepository;
  private _categoryRepository: CategoryRepository;
  private _transactionRepository: TransactionRepository;
  private _userRepository: UserRepository;
  private _api: FinanceApi;
  private _params: RouteSegment;
  private _router: Router;
  private _loadEvent: LoadEvent;

  constructor(
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi, params: RouteSegment, router: Router, loadEvent: LoadEvent) {
    this._accountRepository = accountRepository;
    this._categoryRepository = categoryRepository;
    this._transactionRepository = transactionRepository;
    this._userRepository = userRepository;
    this._api = api;
    this._params = params;
    this._router = router;
    this._loadEvent = loadEvent;
  }

  ngOnInit() {
    this.errors = [];
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
      MyDate.convertToUsString(new Date()),
      this._user.property, 0, 0);
  }

  save(showList: boolean) {
    var account = this.accounts[this.transactionVm.accountIndex];
    var category = this.categories[this.transactionVm.categoryIndex];

    var t = this.transactionVm;
    var transaction = new Transaction(t.uuid, this._user.property, t.value, t.description,
      t.date, account.uuid, account.name,
      category.uuid, category.name, category.type);

    if (!transaction.isValid()) {
      this.errors = transaction.errors;
      return;
    }

    this._loadEvent.announceLoadStart('start');
    if (t.uuid === null) {
      this._api.saveTransaction(transaction, this._user,
        () => this.onSave(transaction, showList));
    } else {
      this._api.updateTransaction(transaction, this._user,
        () => this.onSave(transaction, showList));
    }
  };

  delete() {
    this._loadEvent.announceLoadStart('start');
    this._api.deleteTransaction(this.transactionVm.uuid, this._user,
      () => this.onDelete(this.transactionVm.uuid));
  };

  back() {
    this._router.navigate(['/transaction-list']);
  }

  private createTransactionVm(transaction: Transaction):
    TransactionVm {
    var accountIndex = 0;
    var categoryIndex = 0;

    if (transaction.accountUuid !== null) {
      accountIndex = MyArray.findIndex(transaction.accountUuid, this.accounts);
    }

    if (transaction.categoryUuid !== null) {
      categoryIndex = MyArray.findIndex(transaction.categoryUuid, this.categories);
    }
    return new TransactionVm(transaction.uuid, transaction.value, transaction.description,
      MyDate.convertToUsString(transaction.date), transaction.propertyUuid,
      accountIndex, categoryIndex);
  };

  private onSave(transaction: Transaction, showList: boolean) {
    this._transactionRepository.save(transaction);
    this._router.navigate((showList) ? ['/transaction-list'] : ['/transaction-new']);
    this._loadEvent.announceLoadEnd('finish');
  };

  private onDelete(transactionUuid: string) {
    this._transactionRepository.delete(transactionUuid);
    this._router.navigate(['/transaction-list']);
    this._loadEvent.announceLoadEnd('finish');
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

  isNew(): boolean {
    return this.uuid === null || this.uuid === '' || typeof (this.uuid) === 'undefined';
  }
}

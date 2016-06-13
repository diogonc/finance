import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouteSegment, Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/account-repository.service';
import {CategoryRepository} from '../shared/services/repository/category-repository.service';
import {TransactionRepository} from '../shared/services/repository/transaction-repository.service';
import {UserRepository} from '../shared/services/repository/user-repository.service';
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
  providers: [FinanceApi]
})
export class TransactionComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;
  public transactionVm: TransactionVm;
  public errors: Array<string>;
  public isNew: boolean;

  private user: User;
  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private transactionRepository: TransactionRepository;
  private userRepository: UserRepository;
  private api: FinanceApi;
  private params: RouteSegment;
  private router: Router;
  private loadEvent: LoadEvent;

  constructor(
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi, params: RouteSegment, router: Router, loadEvent: LoadEvent) {
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.transactionRepository = transactionRepository;
    this.userRepository = userRepository;
    this.api = api;
    this.params = params;
    this.router = router;
    this.loadEvent = loadEvent;
  }

  ngOnInit() {
    this.errors = [];
    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();
    this.user = this.userRepository.getUser();

    var uuid = this.params.getParam('id');
    if (typeof (uuid) !== 'undefined') {
      var transaction = this.transactionRepository.get(uuid);
      this.transactionVm = this.createTransactionVm(transaction);
      this.isNew = false;
      return;
    }
    this.transactionVm = new TransactionVm(null, 0, '',
      MyDate.convertToUsString(new Date()),
      this.user.property, 0, 0);
    this.isNew = true;
  }

  save(showList: boolean) {
    var account = this.accounts[this.transactionVm.accountIndex];
    var category = this.categories[this.transactionVm.categoryIndex];

    var t = this.transactionVm;
    var transaction = new Transaction(t.uuid, this.user.property, t.value, t.description,
      t.date, account.uuid, account.name,
      category.uuid, category.name, category.type);

    if (!transaction.isValid()) {
      this.errors = transaction.errors;
      return;
    }

    this.loadEvent.announceLoadStart('start');
    if (t.uuid === null) {
      this.api.saveTransaction(transaction, this.user,
        () => this.onSave(transaction, showList));
    } else {
      this.api.updateTransaction(transaction, this.user,
        () => this.onSave(transaction, showList));
    }
  };

  delete() {
    if (this.transactionVm.uuid === null) {
      return;
    }

    this.loadEvent.announceLoadStart('start');
    this.api.deleteTransaction(this.transactionVm.uuid, this.user,
      () => this.onDelete(this.transactionVm.uuid));
  };

  back() {
    this.router.navigate(['/transaction-list']);
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
    this.transactionRepository.save(transaction);

    if (showList) {
      this.router.navigate(['/transaction-list']);
    } else {
      this.transactionVm = new TransactionVm(null, 0, '',
        MyDate.convertToUsString(new Date()),
        this.user.property, 0, 0);
    }

    this.loadEvent.announceLoadEnd('finish');

  };

  private onDelete(transactionUuid: string) {
    this.transactionRepository.delete(transactionUuid);
    this.router.navigate(['/transaction-list']);
    this.loadEvent.announceLoadEnd('finish');
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

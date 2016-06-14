import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouteSegment, Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/account-repository.service';
import {CategoryRepository} from '../shared/services/repository/category-repository.service';
import {TransactionRepository} from '../shared/services/repository/transaction-repository.service';
import {UserRepository} from '../shared/services/repository/user-repository.service';
import {MyDate} from '../shared/util/my-date';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Account} from '../shared/models/account.model';
import {Category} from '../shared/models/category.model';
import {Transaction} from '../shared/models/transaction.model';
import {User} from '../shared/models/user.model';
import {LoadEvent} from '../shared/events/load.event';

@Component({
  moduleId: module.id,
  selector: 'app-transfer',
  templateUrl: 'transfer.component.html',
  styleUrls: ['transfer.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [FinanceApi]
})
export class TransferComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;
  public transferVm: TransferVm;
  public errors: Array<string>;

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

    this.transferVm = new TransferVm();
  }

  back() {
    this.router.navigate(['/transaction-list']);
  }

  save() {
    var fromAccount = this.accounts[this.transferVm.fromAccountIndex];
    var toAccount = this.accounts[this.transferVm.toAccountIndex];
    var creditCategory = this.categoryRepository.getCreditTransfer();
    var debitCategory = this.categoryRepository.getDebitTransfer();

    var t = this.transferVm;
    var fromTransaction = new Transaction(null, this.user.property, t.value, t.description,
      t.date, fromAccount.uuid, fromAccount.name,
      debitCategory.uuid, debitCategory.name, debitCategory.type);

    var toTransaction = new Transaction(null, this.user.property, t.value, t.description,
      t.date, toAccount.uuid, toAccount.name,
      creditCategory.uuid, creditCategory.name, creditCategory.type);

    if (!fromTransaction.isValid()) {
      this.errors = fromTransaction.errors;
      return;
    }

    this.loadEvent.announceLoadStart('start');

    this.api.saveTransaction(fromTransaction, this.user,
      () => this.onSave(fromTransaction, false));
    this.api.saveTransaction(toTransaction, this.user,
      () => this.onSave(toTransaction, true));
  };

  private onSave(transaction: Transaction, finish: boolean) {
    this.transactionRepository.save(transaction);
    if (finish) {
      this.router.navigate(['/transaction-list']);
      this.loadEvent.announceLoadEnd('finish');
    }
  };
}

class TransferVm {
  value: number;
  description: string;
  date: string;
  propertyUuid: string;
  fromAccountIndex: number;
  toAccountIndex: number;

  constructor() {
    this.value = 0;
    this.description = '';
    this.date = MyDate.convertToUsString(new Date());
    this.propertyUuid = '0';
    this.fromAccountIndex = 0;
    this.toAccountIndex = 0;
  }
}

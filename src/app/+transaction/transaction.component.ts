import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {RouteSegment, Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/account-repository.service';
import {CategoryRepository} from '../shared/services/repository/category-repository.service';
import {TransactionRepository} from '../shared/services/repository/transaction-repository.service';
import {UserRepository} from '../shared/services/repository/user-repository.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Account} from '../shared/models/account.model';
import {Category} from '../shared/models/category.model';
import {Transaction} from '../shared/models/transaction.model';
import {LoadEvent} from '../shared/events/load.event';
import {TransactionVm} from '../shared/application/transaction/transaction-vm';
import {TransactionApp} from '../shared/application/transaction/transaction.app';

@Component({
  moduleId: module.id,
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [FinanceApi, TransactionApp, TransactionVm]
})
export class TransactionComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;
  public transactionVm: TransactionVm;
  public errors: Array<string>;
  public isNew: boolean;
  public showList: boolean;

  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private params: RouteSegment;
  private router: Router;
  private transactionApp: TransactionApp;

  constructor(
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi, params: RouteSegment, router: Router, loadEvent: LoadEvent,
    transactionApp: TransactionApp) {
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.params = params;
    this.router = router;
    this.transactionApp = transactionApp;
  }

  ngOnInit() {
    this.errors = [];
    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();

    var uuid = this.params.getParam('id');
    this.transactionVm = this.transactionApp.load(uuid, this.accounts, this.categories);
  }

  save(showList: boolean) {
    var account = this.accounts[this.transactionVm.accountIndex];
    var category = this.categories[this.transactionVm.categoryIndex];
    this.showList = showList;

    this.transactionApp.save(this.transactionVm, account, category,
                             this.onSuccess.bind(this), this.onError.bind(this));
  };

  delete() {
    this.transactionApp.delete(this.transactionVm.uuid, this.onDelete.bind(this));
  };

  back() {
    this.router.navigate(['/transaction-list']);
  }

  private onSuccess() {
    if (this.showList) {
      this.router.navigate(['/transaction-list']);
    } else {
      this.transactionVm = this.transactionApp.load(null, null, null);
    }
  };

  private onError(errors) {
    this.errors = errors;
  }

  private onDelete() {
    this.router.navigate(['/transaction-list']);
  };
}

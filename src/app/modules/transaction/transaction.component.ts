import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountRepository } from '../../shared/services/repository/account-repository';
import { CategoryRepository } from '../../shared/services/repository/category-repository';
import { TransactionRepository } from '../../shared/services/repository/transaction-repository';
import { UserRepository } from '../../shared/services/repository/user-repository';
import { FinanceApi } from '../../shared/services/api/finance-api';
import { Account } from '../../shared/models/account';
import { Category } from '../../shared/models/category';
import { Transaction } from '../../shared/models/transaction';
import { TransactionVm } from './app/transaction-vm';
import { TransactionApp } from './app/transaction';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.css'],
  providers: [FinanceApi, TransactionApp],
  entryComponents: [SpinnerComponent]
})
export class TransactionComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;
  public transactionVm: TransactionVm;
  public errors: Array<string>;
  public isNew: boolean;
  public showList: boolean;
  public isRequesting: boolean;

  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private route: ActivatedRoute;
  private router: Router;
  private transactionApp: TransactionApp;

  constructor(
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    transactionRepository: TransactionRepository, userRepository: UserRepository,
    api: FinanceApi, route: ActivatedRoute, router: Router,
    transactionApp: TransactionApp) {
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.route = route;
    this.router = router;
    this.transactionApp = transactionApp;
    this.isRequesting = false;
  }

  ngOnInit() {
    this.errors = [];
    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();
    const uuid = this.route.snapshot.params['id'];
    this.transactionVm = this.transactionApp.load(uuid, this.accounts, this.categories);
  }

  save(showList: boolean) {
    const account = this.accounts[this.transactionVm.accountIndex];
    const category = this.categories[this.transactionVm.categoryIndex];
    this.showList = showList;

    this.isRequesting = true;
    this.transactionApp.save(this.transactionVm, account, category,
      this.onSuccess.bind(this), this.onError.bind(this));
  };

  delete() {
    this.isRequesting = true;
    this.transactionApp.delete(this.transactionVm.uuid,
      this.onDelete.bind(this),
      this.onError.bind(this));
  };

  back() {
    this.router.navigate(['/transaction-list']);
  }

  private onSuccess() {
    this.isRequesting = false;
    if (this.showList) {
      this.router.navigate(['/transaction-list']);
    } else {
      this.transactionVm = this.transactionApp.load(null, null, null);
    }
  };

  private onError(errors) {
    this.isRequesting = false;
    this.errors = errors;
  }

  private onDelete() {
    this.isRequesting = false;
    this.router.navigate(['/transaction-list']);
  };
}

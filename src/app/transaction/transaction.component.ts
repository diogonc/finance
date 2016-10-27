import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AccountRepository} from '../services/repository/account-repository';
import {CategoryRepository} from '../services/repository/category-repository';
import {TransactionRepository} from '../services/repository/transaction-repository';
import {UserRepository} from '../services/repository/user-repository';
import {FinanceApi} from '../services/api/finance-api';
import {Account} from '../models/account';
import {Category} from '../models/category';
import {Transaction} from '../models/transaction';
import {TransactionVm} from './app/transaction-vm';
import {TransactionApp} from './app/transaction';

@Component({
  selector: 'app-transaction',
  templateUrl: 'transaction.component.html',
  styleUrls: ['transaction.component.css'],
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
  }

  ngOnInit() {
    this.errors = [];
    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();
    let uuid = this.route.snapshot.params['id'];
    this.transactionVm = this.transactionApp.load(uuid, this.accounts, this.categories);
  }

  save(showList: boolean) {
    let account = this.accounts[this.transactionVm.accountIndex];
    let category = this.categories[this.transactionVm.categoryIndex];
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

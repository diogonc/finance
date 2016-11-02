import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AccountRepository} from '../shared/services/repository/account-repository';
import {CategoryRepository} from '../shared/services/repository/category-repository';
import {TransactionRepository} from '../shared/services/repository/transaction-repository';
import {SearchRepository} from './search-repository';
import {SearchFilter} from './search-filter';
import {Balance} from '../shared/services/balance/balance';
import {MyDate} from '../shared/util/my-date';
import {Account} from '../shared/models/account';
import {Category} from '../shared/models/category';
import {Transaction} from '../shared/models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: 'transaction-list.component.html',
  styleUrls: ['transaction-list.component.css'],
  providers: [Balance, MyDate, SearchRepository]
})
export class TransactionListComponent implements OnInit {
  public searchFilter: SearchFilter;
  public balance: number;
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;
  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private searchRepository: SearchRepository;
  private transactionRepository: TransactionRepository;
  private router: Router;

  constructor(
    transactionRepository: TransactionRepository, dateService: MyDate,
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    searchRepository: SearchRepository, router: Router) {
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.transactionRepository = transactionRepository;
    this.searchRepository = searchRepository;
    this.router = router;
  }

  ngOnInit() {
    let savedFilter = this.searchRepository.getAll()[0];
    if (savedFilter) {
      this.searchFilter = savedFilter;
    }else {
      this.fillDefaultSearch();
    }

    this.balance = 0;
    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();
    this.search();
  }

  search() {
    this.searchRepository.save(this.searchFilter);
    this.transactions = this.transactionRepository.getFiltered(
             this.searchFilter.categorys,
             this.searchFilter.accounts,
             MyDate.convertToDateFromString(this.searchFilter.initialDate),
             MyDate.convertToDateFromString(this.searchFilter.finalDate),
             this.searchFilter.order);
    this.balance = Balance.get(this.transactions);
  }

  edit(uuid: string) {
    this.router.navigate(['/transaction-edit', uuid]);
  }

  private fillDefaultSearch() {
    let firstDayOfMonth = MyDate.getFirstDayOfMonth();
    let lastDayOfMonth = MyDate.getLastDayOfMonth();
    this.searchFilter = new SearchFilter(MyDate.convertToUsString(firstDayOfMonth),
                                         MyDate.convertToUsString(lastDayOfMonth),
                                         [],
                                         [],
                                         'date');
  }
}

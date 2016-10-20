import {Component, OnInit} from '@angular/core';
import {AccountRepository} from '../services/repository/account-repository';
import {CategoryRepository} from '../services/repository/category-repository';
import {TransactionRepository} from '../services/repository/transaction-repository';
import {Balance} from '../report/balance';
import {MyDate} from '../util/my-date';
import {Account} from '../models/account';
import {Category} from '../models/category';
import {Transaction} from '../models/transaction';
import {UserRepository} from '../services/repository/user-repository';
import {LoadEvent} from '../events/load-event';

@Component({
  selector: 'app-transaction-list',
  templateUrl: 'transaction-list.component.html',
  styleUrls: ['transaction-list.component.css'],
  providers: [Balance, AccountRepository, CategoryRepository,
      TransactionRepository, UserRepository, LoadEvent, MyDate]
})
export class TransactionListComponent implements OnInit {
  public account: string;
  public category: string;
  public initialDate: string;
  public finalDate: string;
  public order: string;
  public balance: number;
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transactions: Array<Transaction>;

  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private transactionRepository: TransactionRepository;

  constructor(
    transactionRepository: TransactionRepository, dateService: MyDate,
    accountRepository: AccountRepository, categoryRepository: CategoryRepository) {
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.transactionRepository = transactionRepository;
  }

  ngOnInit() {
    let firstDayOfMonth = MyDate.getFirstDayOfMonth();
    let lastDayOfMonth = MyDate.getLastDayOfMonth();
    this.initialDate = MyDate.convertToUsString(firstDayOfMonth);
    this.finalDate = MyDate.convertToUsString(lastDayOfMonth);
    this.account = '';
    this.category = '';
    this.order = 'date';
    this.balance = 0;

    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();
    this.transactions = this.transactionRepository.getFiltered('', '', firstDayOfMonth, lastDayOfMonth, this.order);
    this.balance = Balance.get(this.transactions);
  }

  search() {
    let initialDate = MyDate.convertToDateFromString(this.initialDate);
    let finalDate = MyDate.convertToDateFromString(this.finalDate);

    this.transactions = this.transactionRepository.getFiltered(
      this.category, this.account, initialDate, finalDate, this.order);
    this.balance = Balance.get(this.transactions);
  }
}

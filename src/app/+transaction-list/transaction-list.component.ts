import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/account-repository.service';
import {CategoryRepository} from '../shared/services/repository/category-repository.service';
import {TransactionRepository} from '../shared/services/repository/transaction-repository.service';
import {Balance} from '../shared/report/balance.service';
import {MyDate} from '../shared/util/my-date';
import {Account} from '../shared/models/account.model';
import {Category} from '../shared/models/category.model';
import {Transaction} from '../shared/models/transaction.model';

@Component({
  moduleId: module.id,
  selector: 'app-transaction-list',
  templateUrl: 'transaction-list.component.html',
  styleUrls: ['transaction-list.component.css'],
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [Balance]
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

  private _accountRepository: AccountRepository;
  private _categoryRepository: CategoryRepository;
  private _transactionRepository: TransactionRepository;

  constructor(
    transactionRepository: TransactionRepository, dateService: MyDate,
    accountRepository: AccountRepository, categoryRepository: CategoryRepository) {
    this._accountRepository = accountRepository;
    this._categoryRepository = categoryRepository;
    this._transactionRepository = transactionRepository;
  }

  ngOnInit() {
    var today = new Date();
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 30);
    this.initialDate = MyDate.convertToUsString(firstDayOfMonth);
    this.finalDate = MyDate.convertToUsString(lastDayOfMonth);
    this.account = '';
    this.category = '';
    this.order = 'date';
    this.balance = 0;

    this.accounts = this._accountRepository.getAll();
    this.categories = this._categoryRepository.getAll();
    this.transactions = this._transactionRepository.getFiltered('', '', firstDayOfMonth, lastDayOfMonth, this.order);
    this.balance = Balance.get(this.transactions);
  }

  search() {
    var initialDate = MyDate.convertToDateFromString(this.initialDate);
    var finalDate = MyDate.convertToDateFromString(this.finalDate);

    this.transactions = this._transactionRepository.getFiltered(
      this.category, this.account, initialDate, finalDate, this.order);
    this.balance = Balance.get(this.transactions);
  }
}

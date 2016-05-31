import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/accountRepository.service';
import {CategoryRepository} from '../shared/services/repository/categoryRepository.service';
import {TransactionRepository} from '../shared/services/repository/transactionRepository.service';
import {MyDate} from '../shared/util/my-date';

@Component({
  moduleId: module.id,
  selector: 'app-transaction-list',
  templateUrl: 'transaction-list.component.html',
  styleUrls: ['transaction-list.component.css'],
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES],
  providers: [AccountRepository, CategoryRepository, TransactionRepository, MyDate]
})
export class TransactionListComponent implements OnInit {
  public account: string;
  public category: string;
  public initialDate: string;
  public finalDate: string;
  public order: string;
  public accounts: Array<Object>;
  public categories: Array<Object>;
  public transactions: Array<Object>;

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

    this.transactions = this._transactionRepository.getFiltered('', '', firstDayOfMonth, lastDayOfMonth, this.order);
    this.accounts = this._accountRepository.getAll();
    this.categories = this._categoryRepository.getAll();
  }

  search() {
    var initialDate = MyDate.convertToDateFromString(this.initialDate);
    var finalDate = MyDate.convertToDateFromString(this.finalDate);

    this.transactions = this._transactionRepository.getFiltered(
        this.category, this.account, initialDate, finalDate, this.order);
  }
}

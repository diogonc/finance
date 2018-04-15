import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AccountRepository } from '../../shared/services/repository/account-repository';
import { CategoryRepository } from '../../shared/services/repository/category-repository';
import { TransactionRepository } from '../../shared/services/repository/transaction-repository';
import { SearchRepository } from './search-repository';
import { SearchFilter } from './search-filter';
import { Balance } from '../../shared/services/balance/balance';
import { MyDate } from '../../shared/util/my-date';
import { Account } from '../../shared/models/account';
import { Category } from '../../shared/models/category';
import { Transaction } from '../../shared/models/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: 'transaction-list.component.html',
  styleUrls: ['transaction-list.component.css'],
  providers: [Balance, MyDate, SearchRepository]
})
export class TransactionListComponent implements OnInit {
  public searchFilter: SearchFilter;
  public balance: number;
  public accounts: Array<any>;
  public categories: Array<any>;
  public transactions: Array<Transaction>;

  constructor(
    private transactionRepository: TransactionRepository,
    private accountRepository: AccountRepository,
    private categoryRepository: CategoryRepository,
    private searchRepository: SearchRepository,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    const savedFilter = this.searchRepository.getAll()[0];
    if (savedFilter) {
      this.searchFilter = savedFilter;
    } else {
      this.fillDefaultSearch();
    }

    this.balance = 0;
    this.accounts = this.formatToSelectMultiple(this.accountRepository.getAll());
    this.categories = this.formatToSelectMultiple(this.categoryRepository.getAll());
    this.search();
  }

  search() {
    console.log(this.searchFilter.categorys);
    this.searchRepository.save(this.searchFilter);
    this.transactions = this.transactionRepository.getFiltered(
      this.formatToSearch(this.searchFilter.categorys),
      this.formatToSearch(this.searchFilter.accounts),
      MyDate.convertToDateFromString(this.searchFilter.initialDate),
      MyDate.convertToDateFromString(this.searchFilter.finalDate),
      this.searchFilter.description,
      this.searchFilter.order);
    this.balance = Balance.get(this.transactions);
  }

  edit(uuid: string) {
    this.router.navigate(['/transaction-edit', uuid]);
  }

  createNew() {
    this.router.navigate(['/transaction-new']);
  }

  cleanFilter() {
    this.fillDefaultSearch();
    this.search();
  }

  public setClass(transaction: Transaction) {
    const isCredit = transaction.isCredit();
    return { green: !isCredit, red: isCredit };
  }

  private fillDefaultSearch() {
    const firstDayOfMonth = MyDate.getFirstDayOfMonth();
    const lastDayOfMonth = MyDate.getLastDayOfMonth();
    this.searchFilter = new SearchFilter(MyDate.convertToUsString(firstDayOfMonth),
      MyDate.convertToUsString(lastDayOfMonth),
      [],
      [],
      'date',
      '');
  }

  private formatToSelectMultiple(itens: Array<any>) {
    return itens.map(function (item) { return { value: item.uuid, label: item.name }; });
  }

  private formatToSearch(itens: Array<any>) {
    return itens.map(function (item) { return item.value; });
  }
}

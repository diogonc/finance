import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BalancePerCategory } from './balance-per-category';
import { BalancePerCategoryReport } from './balance-per-category-report';
import { BalancePerCategoryRow } from './balance-per-category-row';
import { MyDate } from '../../shared/util/my-date';
import { AccountRepository } from '../../shared/services/repository/account-repository';
import { Account } from '../../shared/models/account';
import { SearchFilter } from '../transaction-list/search-filter';
import { SearchRepository } from '../transaction-list/search-repository';
import { OwnerRepository } from '../../shared/services/repository/owner-repository';
import { Owner } from '../../shared/models/owner';
import { CategoryRepository } from '../../shared/services/repository/category-repository';

@Component({
  selector: 'app-balance-per-category',
  templateUrl: 'balance-per-category.component.html',
  styleUrls: ['balance-per-category.component.css'],
  providers: [BalancePerCategory, BalancePerCategoryReport, SearchRepository, OwnerRepository]
})
export class BalancePerCategoryComponent implements OnInit {
  public initialDate: string;
  public finalDate: string;
  public accounts: Array<any>;
  public owners: Array<any>;
  public show: string;
  public balancePerCategoryReport: BalancePerCategoryReport;
  public allAccounts: Array<object>;
  public allOwners: Array<object>;

  constructor(private balancePerCategory: BalancePerCategory,
    private accountRepository: AccountRepository,
    private searchRepository: SearchRepository,
    private ownerRepository: OwnerRepository,
    private categoryRepository: CategoryRepository,
    private router: Router) { }

  ngOnInit() {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), 0, 1);
    const lastDayOfMonth = MyDate.getLastDayOfMonth();
    this.initialDate = MyDate.convertToUsString(firstDayOfMonth);
    this.finalDate = MyDate.convertToUsString(lastDayOfMonth);
    this.accounts = [];
    this.show = 'last';
    this.allAccounts = this.formatToSelectMultiple(this.accountRepository.getAll());
    this.allOwners = this.formatToSelectMultiple(this.ownerRepository.getAll());
    this.balancePerCategoryReport = this.balancePerCategory.get(this.accounts, firstDayOfMonth, lastDayOfMonth);
  }

  public search() {
    const initialDate = MyDate.convertToDateFromString(this.initialDate);
    const finalDate = MyDate.convertToDateFromString(this.finalDate);

    this.balancePerCategoryReport = this.balancePerCategory.get(this.formatToSearch(this.accounts), initialDate, finalDate);
  }

  public ownerSelected() {
    const accounts = this.accountRepository.getFilteredByOwner(this.formatToSearch(this.owners));

    this.accounts = this.formatToSelectMultiple(accounts);
    console.log(this.accounts);
  }

  public hide(index: number, length: number) {
    if (this.show === 'all') {
      return false;
    }
    return index !== length - 1;
  }

  public setCreditClass(value: number, average: number) {
    const isGreater = value >= average;
    return { green: isGreater, red: !isGreater };
  }

  public setDebitClass(value: number, average: number) {
    const isGreater = value >= average;
    return { green: !isGreater, red: isGreater };
  }

  public setBalanceClass(value: number) {
    const isGreater = value >= 0;
    return { green: isGreater, red: !isGreater };
  }

  public showTransactions(categoryUuid: string, date: string): void {
    const category = this.categoryRepository.get(categoryUuid);
    const lastDayOfMonth = MyDate.convertToUsString(MyDate.getLastDayOfMonth(MyDate.convertToDateFromString(date)));
    const transactionsListFilter = new SearchFilter(date,
      lastDayOfMonth, [], [{ value: categoryUuid, label: category.name }], 'date', '');
    this.searchRepository.save(transactionsListFilter);
    this.router.navigate(['/transaction-list']);
  }

  private formatToSelectMultiple(itens: Array<any>) {
    return itens.map(function (item) { return { value: item.uuid, label: item.name }; });
  }

  private formatToSearch(itens: Array<any>) {
    return itens.map(function (item) { return item.value; });
  }
}

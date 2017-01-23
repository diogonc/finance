import { Component, OnInit } from '@angular/core';
import { BalancePerCategory } from './balance-per-category';
import { BalancePerCategoryReport } from './balance-per-category-report';
import { BalancePerCategoryRow } from './balance-per-category-row';
import { MyDate } from '../shared/util/my-date';
import { AccountRepository } from '../shared/services/repository/account-repository';
import { Account } from '../shared/models/account';

@Component({
  selector: 'app-balance-per-category',
  templateUrl: 'balance-per-category.component.html',
  styleUrls: ['balance-per-category.component.css'],
  providers: [BalancePerCategory, BalancePerCategoryReport, BalancePerCategoryRow]
})
export class BalancePerCategoryComponent implements OnInit {
  public showSearch: Boolean;
  public accountRepository: AccountRepository;
  public initialDate: string;
  public finalDate: string;
  public accounts: Array<any>;
  public show: string;
  public balancePerCategoryReport: BalancePerCategoryReport;
  public balancePerCategory: BalancePerCategory;
  public allAccounts: Array<Account>;

  constructor(balancePerCategory: BalancePerCategory, accountRepository: AccountRepository) {
    this.balancePerCategory = balancePerCategory;
    this.accountRepository = accountRepository;
  }

  ngOnInit() {
    this.showSearch = false;
    let today = new Date();
    let firstDayOfMonth = new Date(today.getFullYear(), 0, 1);
    let lastDayOfMonth = MyDate.getLastDayOfMonth();
    this.initialDate = MyDate.convertToUsString(firstDayOfMonth);
    this.finalDate = MyDate.convertToUsString(lastDayOfMonth);
    this.accounts = [];
    this.show = 'last';
    this.allAccounts = this.formatAccountsFilter(this.accountRepository.getAll());

    this.balancePerCategoryReport = this.balancePerCategory.get(this.accounts, firstDayOfMonth, lastDayOfMonth);
  }

  search() {
    let initialDate = MyDate.convertToDateFromString(this.initialDate);
    let finalDate = MyDate.convertToDateFromString(this.finalDate);

    this.balancePerCategoryReport = this.balancePerCategory.get(this.accounts, initialDate, finalDate);
  }

  hide(index: number, length: number) {
    if (this.show === 'all') {
      return false;
    }
    return index !== length - 1;
  }

  setCreditClass(value: number, average: number) {
    let isGreater = value >= average;
    return { green: isGreater, red: !isGreater };
  }

  setDebitClass(value: number, average: number) {
    let isGreater = value >= average;
    return { green: !isGreater, red: isGreater };
  }

  toogle() {
    this.showSearch = !this.showSearch;
  }

  private formatAccountsFilter(accounts: Array<Account>) {
    let options = [];
    let length = accounts.length;
    for (let i = 0; i < length; i++) {
      let account = accounts[i];
      options.push({ value: account.uuid, label: account.name });
    }
    return options;
  }
}

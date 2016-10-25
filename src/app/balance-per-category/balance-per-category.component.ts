import {Component, OnInit } from '@angular/core';
import {BalancePerCategory} from '../report/balance-per-category';
import {BalancePerCategoryReport} from '../report/balance-per-category-report';
import {BalancePerCategoryRow} from '../report/balance-per-category-row';
import {MyDate} from '../util/my-date';
import {AccountRepository} from '../services/repository/account-repository';
import {CategoryRepository} from '../services/repository/category-repository';
import {TransactionRepository} from '../services/repository/transaction-repository';
import {UserRepository} from '../services/repository/user-repository';
import {LoadEvent} from '../events/load-event';

@Component({
  selector: 'app-balance-per-category',
  templateUrl: 'balance-per-category.component.html',
  styleUrls: ['balance-per-category.component.css'],
  providers: [BalancePerCategory, BalancePerCategoryReport, BalancePerCategoryRow,
      AccountRepository, CategoryRepository, TransactionRepository, UserRepository, LoadEvent]
})
export class BalancePerCategoryComponent implements OnInit {
  public initialDate: string;
  public finalDate: string;
  public show: string;
  public balancePerCategoryReport: BalancePerCategoryReport;
  public balancePerCategory: BalancePerCategory;

  constructor(balancePerCategory: BalancePerCategory) {
    this.balancePerCategory = balancePerCategory;
  }

  ngOnInit() {
    let today = new Date();
    let firstDayOfMonth = new Date(today.getFullYear(), 0, 1);
    let lastDayOfMonth = MyDate.getLastDayOfMonth();
    this.initialDate = MyDate.convertToUsString(firstDayOfMonth);
    this.finalDate = MyDate.convertToUsString(lastDayOfMonth);
    this.show = 'last';

    this.balancePerCategoryReport = this.balancePerCategory.get(firstDayOfMonth, lastDayOfMonth);
  }

  search() {
    let initialDate = MyDate.convertToDateFromString(this.initialDate);
    let finalDate = MyDate.convertToDateFromString(this.finalDate);

    this.balancePerCategoryReport = this.balancePerCategory.get(initialDate, finalDate);
  }

  hide(index: number, length: number) {
    if (this.show === 'all') {
      return false;
    }
    return index !== length - 1;
  }

  setCreditClass(value: number, average: number) {
    let isGreater = value >= average;
    return {green: isGreater, red: !isGreater};
  }

  setDebitClass(value: number, average: number) {
    let isGreater = value >= average;
    return {green: !isGreater, red: isGreater};
  }
}

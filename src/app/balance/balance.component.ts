import {Component, OnInit} from '@angular/core';
import {Balance} from '../report/balance';
import {BalancePerAccount, BalancePerAccountReport} from '../report/balance-per-account';
import {MyDate} from '../util/my-date';
import {AccountRepository} from '../services/repository/account-repository';
import {CategoryRepository} from '../services/repository/category-repository';
import {TransactionRepository} from '../services/repository/transaction-repository';
import {UserRepository} from '../services/repository/user-repository';
import {LoadEvent} from '../events/load-event';

@Component({
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css'],
  providers: [BalancePerAccount, Balance, AccountRepository, CategoryRepository,
      TransactionRepository, UserRepository, LoadEvent ]
})
export class BalanceComponent implements OnInit {
  public date: string;
  public balancePerAccountReport: BalancePerAccountReport;
  private balancePerAccount: BalancePerAccount;

  constructor(balancePerAccount: BalancePerAccount) {
    this.balancePerAccount = balancePerAccount;
  }

  ngOnInit() {
    let today = new Date();
    this.date = MyDate.convertToUsString(today);
    this.balancePerAccountReport = this.balancePerAccount.get(today);
  }

  search() {
    let date = MyDate.convertToDateFromString(this.date);

    this.balancePerAccountReport = this.balancePerAccount.get(date);
  }
}

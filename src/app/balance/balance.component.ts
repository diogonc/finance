import {Component, OnInit} from '@angular/core';
import {Balance} from '../report/balance';
import {BalancePerAccount, BalancePerAccountReport} from '../report/balance-per-account';
import {MyDate} from '../util/my-date';

@Component({
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css'],
  providers: [BalancePerAccount, Balance]
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

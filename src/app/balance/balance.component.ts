import {Component, OnInit} from '@angular/core';
import {Balance} from '../shared/services/balance/balance';
import {MyDate} from '../shared/util/my-date';
import {BalancePerAccount, BalancePerAccountReport} from './balance-per-account';

@Component({
  selector: 'app-balance',
  templateUrl: 'app/balance/balance.component.html',
  styleUrls: ['app/balance/balance.component.css'],
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

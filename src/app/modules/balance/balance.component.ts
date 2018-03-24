import { Component, OnInit } from '@angular/core';
import { Balance } from '../../shared/services/balance/balance';
import { MyDate } from '../../shared/util/my-date';
import { BalancePerAccount, BalancePerAccountReport } from './balance-per-account';

@Component({
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css'],
  providers: [BalancePerAccount, Balance]
})
export class BalanceComponent implements OnInit {
  public date: string;
  public balancePerAccountReport: BalancePerAccountReport;

  constructor(private balancePerAccount: BalancePerAccount) { }

  ngOnInit() {
    const today = new Date();
    this.date = MyDate.convertToUsString(today);
    this.balancePerAccountReport = this.balancePerAccount.get(today);
  }

  search() {
    const date = MyDate.convertToDateFromString(this.date);

    this.balancePerAccountReport = this.balancePerAccount.get(date);
  }
}

import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Balance} from '../shared/report/balance.service';
import {BalancePerAccount, BalancePerAccountReport} from '../shared/report/balance-per-account.service';
import {MyDate} from '../shared/util/my-date';

@Component({
  moduleId: module.id,
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [BalancePerAccount, Balance]
})
export class BalanceComponent implements OnInit {
  public date: string;
  public balanceReportReport: BalancePerAccountReport;
  private balancePerAccount: BalancePerAccount;

  constructor(balancePerAccount: BalancePerAccount) {
    this.balancePerAccount = balancePerAccount;
  }

  ngOnInit() {
    var today = new Date();
    this.date = MyDate.convertToUsString(today);
    this.balanceReportReport = this.balancePerAccount.get(today);
  }

  search() {
    var date = MyDate.convertToDateFromString(this.date);

    this.balanceReportReport = this.balancePerAccount.get(date);
  }
}

import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {AccountRepository} from '../shared/services/repository/accountRepository.service';
import {CategoryRepository} from '../shared/services/repository/categoryRepository.service';
import {TransactionRepository} from '../shared/services/repository/transactionRepository.service';
import {Balance} from '../shared/report/balance.service';
import {BalancePerAccount, BalancePerAccountReportDto} from '../shared/report/balance-per-account.service';
import {MyDate} from '../shared/util/my-date';

@Component({
  moduleId: module.id,
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [AccountRepository, CategoryRepository, TransactionRepository, MyDate, BalancePerAccount, Balance]
})
export class BalanceComponent implements OnInit {
  public date: string;
  public balanceReportDto: BalancePerAccountReportDto;
  private _balancePerAccount: BalancePerAccount;

  constructor(balancePerAccount: BalancePerAccount) {
    this._balancePerAccount = balancePerAccount;
  }

  ngOnInit() {
    var today = new Date();
    this.date = MyDate.convertToUsString(today);
    this.balanceReportDto = this._balancePerAccount.get(today);
  }

  search() {
    var date = MyDate.convertToDateFromString(this.date);

    this.balanceReportDto = this._balancePerAccount.get(date);
  }
}

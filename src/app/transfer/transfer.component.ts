import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/account-repository';
import {CategoryRepository} from '../shared/services/repository/category-repository';
import {FinanceApi} from '../shared/services/api/finance-api';
import {Account} from '../shared/models/account';
import {Category} from '../shared/models/category';
import {TransferApp} from './app/transfer';
import {TransferVm} from './app/transfer-vm';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'app-transfer',
  templateUrl: 'transfer.component.html',
  styleUrls: ['transfer.component.css'],
  providers: [FinanceApi, TransferApp],
  entryComponents: [SpinnerComponent]
})
export class TransferComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transferVm: TransferVm;
  public errors: Array<string>;
  public isRequesting: boolean;

  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private router: Router;

  private transferApp: TransferApp;

  constructor(
    accountRepository: AccountRepository, categoryRepository: CategoryRepository,
    router: Router, transferApp: TransferApp) {
    this.accountRepository = accountRepository;
    this.categoryRepository = categoryRepository;
    this.router = router;
    this.transferApp = transferApp;
    this.isRequesting = false;
  }

  ngOnInit() {
    this.errors = [];
    this.accounts = this.accountRepository.getAll();
    this.categories = this.categoryRepository.getAll();
    this.transferVm = new TransferVm();
  }

  back() {
    this.router.navigate(['/transaction-list']);
  }

  save() {
    let fromAccount = this.accounts[this.transferVm.fromAccountIndex];
    let toAccount = this.accounts[this.transferVm.toAccountIndex];
    let creditCategory = this.categoryRepository.getCreditTransfer();
    let debitCategory = this.categoryRepository.getDebitTransfer();

    this.isRequesting = true;
    this.transferApp.save(this.transferVm, fromAccount, toAccount, creditCategory, debitCategory,
      this.onSuccess.bind(this), this.onError.bind(this));
  };

  private onError(errors: Array<string>): void {
    this.isRequesting = false;
    this.errors = errors;
  }

  private onSuccess(): void {
    this.isRequesting = false;
    this.back();
  }
}

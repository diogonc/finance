import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Router} from '@angular/router';
import {AccountRepository} from '../shared/services/repository/account-repository.service';
import {CategoryRepository} from '../shared/services/repository/category-repository.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Account} from '../shared/models/account.model';
import {Category} from '../shared/models/category.model';
import {TransferApp} from '../shared/application/transfer/transfer.app';
import {TransferVm} from '../shared/application/transfer/transfer-vm';

@Component({
  moduleId: module.id,
  selector: 'app-transfer',
  templateUrl: 'transfer.component.html',
  styleUrls: ['transfer.component.css'],
  directives: [CORE_DIRECTIVES],
  providers: [FinanceApi, TransferApp]
})
export class TransferComponent implements OnInit {
  public accounts: Array<Account>;
  public categories: Array<Category>;
  public transferVm: TransferVm;
  public errors: Array<string>;

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
    var fromAccount = this.accounts[this.transferVm.fromAccountIndex];
    var toAccount = this.accounts[this.transferVm.toAccountIndex];
    var creditCategory = this.categoryRepository.getCreditTransfer();
    var debitCategory = this.categoryRepository.getDebitTransfer();

    this.transferApp.save(this.transferVm, fromAccount, toAccount, creditCategory, debitCategory,
      this.onSuccess.bind(this), this.onError.bind(this));
  };

  private onError(errors: Array<string>): void {
    this.errors = errors;
  }

  private onSuccess(): void {
    this.back();
  }
}

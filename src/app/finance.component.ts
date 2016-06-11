import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoginComponent} from './+login';
import {TransactionListComponent} from './+transaction-list';
import {TransactionComponent} from './+transaction';
import {UserRepository} from './shared/services/repository/user-repository.service';
import {LoaderComponent} from './loader/loader.component';
import {LoginEvent} from './shared/events/login.event';
import {LoadEvent} from './shared/events/load.event';
import {TransferComponent} from './+transfer';
import {BalanceComponent} from './+balance';
import {AccountRepository} from './shared/services/repository/account-repository.service';
import {CategoryRepository} from './shared/services/repository/category-repository.service';
import {TransactionRepository} from './shared/services/repository/transaction-repository.service';
import {MyDate} from './shared/util/my-date';
import {MyArray} from './shared/util/my-array';

@Component({
  moduleId: module.id,
  selector: 'finance-app',
  templateUrl: 'finance.component.html',
  styleUrls: ['finance.component.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, LoaderComponent],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, AccountRepository, CategoryRepository,
    UserRepository, TransactionRepository, MyDate, MyArray, LoginEvent, LoadEvent]
})
@Routes([
  { path: 'finance', component: LoginComponent },
  { path: '/login', component: LoginComponent },
  { path: '/transaction-list', component: TransactionListComponent },
  { path: '/transaction-new', component: TransactionComponent },
  { path: '/transaction-edit/:id', component: TransactionComponent },
  { path: '/transfer', component: TransferComponent },
  { path: '/balance', component: BalanceComponent }

])

export class FinanceAppComponent implements OnInit {
  isLogged: boolean;
  title: 'Financeiro';

  private _router: Router;
  private _userRepository: UserRepository;

  constructor(repository: UserRepository, loginEvent: LoginEvent, router: Router) {
    this._userRepository = repository;
    this._router = router;

    loginEvent.logginAnnouced$.subscribe(
      user => {
        this.isLogged = this._userRepository.isLogged();
      });
  }

  ngOnInit() {
    this.isLogged = this._userRepository.isLogged();
  }
}

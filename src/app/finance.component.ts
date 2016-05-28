import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoginComponent} from './+login';
import {TransactionListComponent} from './+transaction-list';
import {TransactionComponent} from './+transaction';
import {AuthService} from './shared/services/auth/auth.service';
import {UserRepository} from './shared/services/repository/userRepository.service';

@Component({
  moduleId: module.id,
  selector: 'finance-app',
  templateUrl: 'finance.component.html',
  styleUrls: ['finance.component.css'],
  directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS, AuthService, UserRepository]
})
@Routes([
  {path: '/login', component: LoginComponent},
  {path: '/transaction-list', component: TransactionListComponent},
  {path: '/transaction-new', component: TransactionComponent},
  {path: '/transaction-edit/:id', component: TransactionComponent}

])

export class FinanceAppComponent implements OnInit {
  isLogged: boolean;
  title: 'Financeiro';

  private _auth: AuthService;

  constructor(auth: AuthService) {
    this._auth = auth;
  }

  ngOnInit() {
    this.isLogged = true;
  }
}

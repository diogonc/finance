import {Component} from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {LoginComponent} from './+login';
import {TransactionListComponent} from './+transaction-list';
import {TransactionComponent} from './+transaction';

@Component({
  moduleId: module.id,
  selector: 'finance-app',
  templateUrl: 'finance.component.html',
  styleUrls: ['finance.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [ROUTER_PROVIDERS, HTTP_PROVIDERS]
})
@Routes([
  {path: '/', component: LoginComponent},
  {path: '/transaction-list', component: TransactionListComponent},
  {path: '/transaction-new', component: TransactionComponent},
  {path: '/transaction-edit/:id', component: TransactionComponent}

])
export class FinanceAppComponent {
  title = 'finance works!';
}

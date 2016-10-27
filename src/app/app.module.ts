import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { FinanceRoutingModule} from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BalanceComponent } from './balance/balance.component';
import { BalancePerCategoryComponent } from './balance-per-category/balance-per-category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransferComponent } from './transfer/transfer.component';

import {LoginEvent} from './events/login-event';

import {AccountRepository} from './services/repository/account-repository';
import {CategoryRepository} from './services/repository/category-repository';
import {TransactionRepository} from './services/repository/transaction-repository';
import {UserRepository} from './services/repository/user-repository';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BalanceComponent,
    BalancePerCategoryComponent,
    TransactionComponent,
    TransactionListComponent,
    TransferComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FinanceRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [LoginEvent, AccountRepository, CategoryRepository,
     TransactionRepository, UserRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }

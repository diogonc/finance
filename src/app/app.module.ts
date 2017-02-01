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
import { SpinnerComponent } from './spinner/spinner.component';

import {LoginEvent} from './events/login-event';

import {AccountRepository} from './shared/services/repository/account-repository';
import {CategoryRepository} from './shared/services/repository/category-repository';
import {TransactionRepository} from './shared/services/repository/transaction-repository';
import {UserRepository} from './shared/services/repository/user-repository';

import {SelectModule} from 'angular2-select';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BalanceComponent,
    BalancePerCategoryComponent,
    TransactionComponent,
    TransactionListComponent,
    TransferComponent,
    SpinnerComponent,
    CategoryListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FinanceRoutingModule,
    SelectModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [LoginEvent, AccountRepository, CategoryRepository,
     TransactionRepository, UserRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BalanceComponent } from './balance/balance.component';
import { BalancePerCategoryComponent } from './balance-per-category/balance-per-category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransferComponent } from './transfer/transfer.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { LoginEvent } from './events/login-event';

import { AccountRepository } from './shared/services/repository/account-repository';
import { CategoryRepository } from './shared/services/repository/category-repository';
import { TransactionRepository } from './shared/services/repository/transaction-repository';
import { UserRepository } from './shared/services/repository/user-repository';

import { SelectModule } from 'angular2-select';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
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
    CategoryListComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'transaction-list', component: TransactionListComponent },
      { path: 'category-list', component: CategoryListComponent },
      { path: 'transaction-new', component: TransactionComponent },
      { path: 'transaction-edit/:id', component: TransactionComponent },
      { path: 'category-new', component: CategoryComponent },
      { path: 'category-edit/:id', component: CategoryComponent },
      { path: 'transfer', component: TransferComponent },
      { path: 'balance', component: BalanceComponent },
      { path: 'balance-per-category', component: BalancePerCategoryComponent }
    ])
  ],
  providers: [LoginEvent, AccountRepository, CategoryRepository,
    TransactionRepository, UserRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { LoginComponent } from './modules/login/login.component';
import { BalanceComponent } from './modules//balance/balance.component';
import { BalancePerCategoryComponent } from './modules//balance-per-category/balance-per-category.component';
import { CategoryListComponent } from './modules//category-list/category-list.component';
import { CategoryComponent } from './modules//category/category.component';
import { TransactionComponent } from './modules//transaction/transaction.component';
import { TransactionListComponent } from './modules//transaction-list/transaction-list.component';
import { TransferComponent } from './modules//transfer/transfer.component';
import { SpinnerComponent } from './modules//spinner/spinner.component';
import { LoginEvent } from './modules//events/login-event';
import { AccountRepository } from './shared/services/repository/account-repository';
import { CategoryRepository } from './shared/services/repository/category-repository';
import { GroupRepository } from './shared/services/repository/group-repository';
import { TransactionRepository } from './shared/services/repository/transaction-repository';
import { UserRepository } from './shared/services/repository/user-repository';

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
    BrowserModule,
    FormsModule,
    HttpClientModule,
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
  providers: [LoginEvent, AccountRepository, CategoryRepository, GroupRepository, TransactionRepository, UserRepository],
  bootstrap: [AppComponent]
})
export class AppModule { }

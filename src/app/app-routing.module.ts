import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransferComponent } from './transfer/transfer.component';
import { BalanceComponent } from './balance/balance.component';
import { BalancePerCategoryComponent } from './balance-per-category/balance-per-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
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
  { path: 'balance-per-category', component: BalancePerCategoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class FinanceRoutingModule { }

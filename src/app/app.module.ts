import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BalanceComponent } from './balance/balance.component';
// import { BalancePerCategoryComponent } from './balance-per-category/balance-per-category.component';
// import { LoaderComponent } from './loader/loader.component';
import { LogoutComponent } from './logout/logout.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransferComponent } from './transfer/transfer.component';
import { FinanceRoutingModule} from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BalanceComponent,
    // BalancePerCategoryComponent,
    // LoaderComponent,
    LogoutComponent,
    TransactionComponent,
    TransactionListComponent,
    TransferComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FinanceRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

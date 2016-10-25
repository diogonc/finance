import {Component, OnInit} from '@angular/core';
import {UserRepository} from './services/repository/user-repository';
import {LoadEvent} from './events/load-event';
import {AccountRepository} from './services/repository/account-repository';
import {CategoryRepository} from './services/repository/category-repository';
import {TransactionRepository} from './services/repository/transaction-repository';
import {MyDate} from './util/my-date';
import {MyArray} from './util/my-array';
import {RouterOutlet } from '@angular/router';
import {LoginEvent} from './events/login-event';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [AccountRepository, CategoryRepository, TransactionRepository, UserRepository, 
  LoadEvent]
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  title: 'Financeiro';
  private userRepository: UserRepository;

  constructor(repository: UserRepository, loginEvent: LoginEvent) {
    this.userRepository = repository;

    loginEvent.logginAnnouced$.subscribe(
      user => {
        this.isLogged = this.userRepository.isLogged();
      });
  }

  ngOnInit() {
    this.isLogged = this.userRepository.isLogged();
  }
}

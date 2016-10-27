import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginApp}from './app/login';
import {Sha1} from './sha1/sha1';
import {FinanceApi} from '../services/api/finance-api';
import {Sync} from '../services/sync/sync';
import {UserRepository} from '../services/repository/user-repository';
import {User} from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  providers: [Sha1, Sync, FinanceApi, LoginApp]
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public errors: Array<string>;
  private loginApp: LoginApp;
  private router: Router;
  private userRepository: UserRepository;

  constructor(loginApp: LoginApp, router: Router, userRepository: UserRepository) {
    this.loginApp = loginApp;
    this.router = router;
    this.userRepository = userRepository;
  }

  ngOnInit() {
    if (this.userRepository.isLogged()) {
      this.router.navigate(['/transaction-new']);
    }
  }

  login(username: string, password: string): void {
    this.loginApp.login(username, password, this.onSuccess.bind(this), this.onError.bind(this));
  }

  onSuccess(user: User): void {
    this.router.navigate(['/transaction-list']);
  }

  onError(errors: string): void {
    this.errors.push(errors);
  }
}

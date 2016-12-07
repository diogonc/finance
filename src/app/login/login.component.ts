import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginApp}from './app/login';
import {Sha1} from './sha1/sha1';
import {FinanceApi} from '../shared/services/api/finance-api';
import {Sync} from '../shared/services/sync/sync';
import {UserRepository} from '../shared/services/repository/user-repository';
import {User} from '../shared/models/user';
import {SpinnerComponent} from '../spinner/spinner.component';

@Component({
  selector: 'app-login',
  templateUrl: 'app/login/login.component.html',
  styleUrls: ['app/login/login.component.css'],
  providers: [Sha1, Sync, FinanceApi, LoginApp],
  entryComponents:[SpinnerComponent]
})
export class LoginComponent implements OnInit {
  public isRequesting: boolean;
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
    this.isRequesting = false;
  }

  ngOnInit() {
    if (this.userRepository.isLogged()) {
      this.router.navigate(['/transaction-new']);
    }
  }

  login(username: string, password: string): void {
    this.isRequesting = true;
    this.loginApp.login(username, password, this.onSuccess.bind(this), this.onError.bind(this));
  }

  onSuccess(user: User): void {
    this.router.navigate(['/transaction-list']);
    this.isRequesting = false;
  }

  onError(errors: string): void {
    this.errors.push(errors);
    this.isRequesting = false;
  }
}

import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Router} from '@angular/router';
import {Sha1} from '../shared/services/sha1/sha1.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Sync} from '../shared/services/sync/sync.service';
import {User} from '../shared/models/user.model';
import {LoginApp}from '../shared/application/login/login.app';
import {UserRepository} from '../shared/services/repository/user-repository.service';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
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

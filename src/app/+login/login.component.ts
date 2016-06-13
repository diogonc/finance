import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Router} from '@angular/router';
import {Sha1} from '../shared/services/sha1/sha1.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Sync} from '../shared/services/sync/sync.service';
import {User} from '../shared/models/user.model';
import {LoginApp}from '../shared/application/login/login.app';

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

  constructor(loginApp: LoginApp, router: Router) {
    this.loginApp = loginApp;
    this.router = router;
  }

  ngOnInit() {
    this.loginApp.onInit();
    this.errors = [];
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

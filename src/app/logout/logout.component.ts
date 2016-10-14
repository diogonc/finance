import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginApp}from '../application/login/login';
import {Sha1} from '../services/sha1/sha1';
import {FinanceApi} from '../services/api/finance-api';
import {Sync} from '../services/sync/sync';

@Component({
  selector: 'app-logout',
  templateUrl: 'logout.component.html',
  styleUrls: ['logout.component.css'],
  providers: [Sha1, Sync, FinanceApi, LoginApp]
})
export class LogoutComponent implements OnInit {
  private loginApp: LoginApp;
  private router: Router;

  constructor(login: LoginApp, router: Router) {
    this.loginApp = login;
    this.router = router;
  }

  ngOnInit() {
    this.loginApp.logout();
    this.router.navigate(['/login']);
  }
}

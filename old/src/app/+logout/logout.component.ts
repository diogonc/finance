import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoginApp}from '../shared/application/login/login.app';
import {Sha1} from '../shared/services/sha1/sha1.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Sync} from '../shared/services/sync/sync.service';

@Component({
  moduleId: module.id,
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

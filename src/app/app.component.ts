import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginEvent} from './events/login-event';
import {LoginApp} from './login/app/login';
import {Sha1} from './login/sha1/sha1';
import {Sync} from './shared/services/sync/sync';
import {FinanceApi} from './shared/services/api/finance-api';
import {UserRepository} from './shared/services/repository/user-repository';
import {BackupService} from './shared/services/backup/backup.service';
import {CsvCreatorService} from './shared/services/backup/csv/csv-creator.service';
import {SpinnerComponent} from './spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app/app.component.html',
  styleUrls: ['app/app.component.css'],
  providers: [Sha1, Sync, FinanceApi, LoginApp, LoginEvent, BackupService, CsvCreatorService],
  entryComponents: [SpinnerComponent]
})
export class AppComponent implements OnInit {
  isLogged: boolean;
  isRequesting: boolean;
  title: 'Financeiro';
  user: string;
  private userRepository: UserRepository;
  private loginApp: LoginApp;
  private router: Router;
  private backupService: BackupService;
  private sync: Sync;


  constructor(repository: UserRepository, loginEvent: LoginEvent, loginApp: LoginApp,
    router: Router, backupService: BackupService, sync: Sync) {
    this.userRepository = repository;
    this.loginApp = loginApp;
    this.router = router;
    this.backupService = backupService;
    this.sync = sync;
    this.isRequesting = false;
    this.user = '';

    loginEvent.logginAnnouced$.subscribe(
      user => {
        this.isLogged = this.userRepository.isLogged();
      });
  }

  ngOnInit() {
    this.isLogged = this.userRepository.isLogged();

    if (this.isLogged) {
      let user = this.userRepository.getUser();
      this.user = user.login;
    }
  }

  logout() {
    this.loginApp.logout();
    this.router.navigate(['/login']);
  }

  download() {
    this.isRequesting = true;
    let user = this.userRepository.getUser();
    this.sync.getAllDataFromServer(user,
    () => { this.isRequesting = false; },
    () => { this.isRequesting = false; });
  }

  export() {
    let csvData = this.backupService.generate();
    let blob = new Blob([csvData], { type: 'text/csv' });
    let url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}

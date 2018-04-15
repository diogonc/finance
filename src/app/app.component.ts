import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginEvent } from './modules/events/login-event';
import { LoginApp } from './modules/login/app/login';
import { Sha1 } from './modules/login/sha1/sha1';
import { Sync } from './shared/services/sync/sync';
import { FinanceApi } from './shared/services/api/finance-api';
import { UserRepository } from './shared/services/repository/user-repository';
import { BackupService } from './shared/services/backup/backup.service';
import { CsvCreatorService } from './shared/services/backup/csv/csv-creator.service';
import { SpinnerComponent } from './modules/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
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
      const user = this.userRepository.getUser();
      this.user = user.login;
    }
    this.carregarDropDown();
  }

  logout() {
    this.loginApp.logout();
    this.router.navigate(['/login']);
  }

  download() {
    this.isRequesting = true;
    const user = this.userRepository.getUser();
    this.sync.getAllDataFromServer(
      () => { this.isRequesting = false; },
      () => { this.isRequesting = false; });
  }

  export() {
    const csvData = this.backupService.generate();
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  carregarDropDown() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach(function ($el) {
        $el.addEventListener('click', function () {

          // Get the target from the "data-target" attribute
          const target = $el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active');
          $target.classList.toggle('is-active');

        });
      });
    }
  }
}

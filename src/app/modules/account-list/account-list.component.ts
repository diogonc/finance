import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../../shared/models/account';
import { AccountRepository } from '../../shared/services/repository/account-repository';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {
  public accounts: Array<Account>;

  constructor(
    private accountRepository: AccountRepository,
    private router: Router) {
  }

  ngOnInit() {
    this.accounts = this.accountRepository.getAll();
  }

  edit(uuid: string) {
    this.router.navigate(['/account-edit', uuid]);
  }

  new() {
    this.router.navigate(['/account-new']);
  }
}

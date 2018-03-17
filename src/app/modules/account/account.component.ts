import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MyArray } from '../../shared/util/my-array';
import { Account } from '../../shared/models/account';
import { AccountRepository } from '../../shared/services/repository/account-repository';
import { OwnerRepository } from '../../shared/services/repository/owner-repository';
import { UserRepository } from '../../shared/services/repository/user-repository';
import { FinanceApi } from '../../shared/services/api/finance-api';
import { Owner } from '../../shared/models/owner';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public account: Account;
  public owners: Array<Owner>;
  public ownerIndex: number;
  public isRequesting: boolean;
  public isNew: boolean;
  public showList: boolean;
  public errors: Array<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountRepository: AccountRepository,
    private ownerRepository: OwnerRepository,
    private userRepository: UserRepository,
    private api: FinanceApi) {
    this.isRequesting = false;
  }

  ngOnInit() {
    this.owners = this.ownerRepository.getAll();

    const uuid = this.route.snapshot.params['id'];
    if (typeof (uuid) !== 'undefined' && uuid !== null) {
      const account = this.accountRepository.get(uuid);
      this.account = new Account(account.uuid, account.name, account.owner, account.priority);
      if (account.owner !== null) {
        this.ownerIndex = MyArray.findIndex(account.owner.uuid, this.owners);
      }
      this.isNew = false;
    } else {
      this.isNew = true;
      this.account = new Account(null, '', null, 1);
      this.ownerIndex = 0;
    }
  }

  save(showList: boolean) {
    const user = this.userRepository.getUser();
    this.isRequesting = true;
    const owner = this.owners[this.ownerIndex];
    const account = new Account(this.account.uuid, this.account.name, owner, this.account.priority);
    account.propertyUuid = user.property;

    if (!account.isValid()) {
      this.onError(account.errors);
      return;
    }

    if (account.uuid === null) {
      this.api.saveAccount(account,
        (response) => {
          this.account.uuid = response.uuid;
          this.onSave(account, this.onSuccess.bind(this));
        },
        this.onError.bind(this));
    } else {
      this.api.updateAccount(account,
        () => this.onSave(account, this.onSuccess.bind(this)),
        this.onError.bind(this));
    }
    this.showList = showList;
  }

  delete() {
    this.isRequesting = true;
    const uuid = this.account.uuid;
    if (uuid === null) {
      return;
    }
    this.api.deleteAccount(uuid,
      () => this.onDelete(uuid, this.onSuccess.bind(this)),
      this.onError.bind(this));
  }

  back() {
    this.router.navigate(['/account-list']);
  }

  private onSave(account: Account, onSuccess: () => void) {
    this.accountRepository.save(account);
    onSuccess();
  }

  private onDelete(accountUuid: string, onSuccess: () => void) {
    this.accountRepository.delete(accountUuid);
    this.isRequesting = false;
    this.router.navigate(['/account-list']);
    onSuccess();
  }

  private onSuccess() {
    this.isRequesting = false;
    if (this.showList) {
      this.router.navigate(['/account-list']);
    } else {
      this.isNew = true;
      this.account = new Account(null, '', null, 1);
    }
  }

  private onError(errors) {
    this.isRequesting = false;
    this.errors = errors;
  }
}

import {Component, OnInit} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {Router} from '@angular/router';
import {Sha1} from '../shared/services/sha1/sha1.service';
import {UserRepository} from '../shared/services/repository/userRepository.service';
import {AccountRepository} from '../shared/services/repository/accountRepository.service';
import {CategoryRepository} from '../shared/services/repository/categoryRepository.service';
import {TransactionRepository} from '../shared/services/repository/transactionRepository.service';
import {FinanceApi} from '../shared/services/api/finance-api.service';
import {Sync} from '../shared/services/sync/sync.service';
import {User} from '../shared/models/user.model';
import {MyDate} from '../shared/util/my-date';
import {LoadEvent} from '../shared/events/load.event';
import {LoginEvent} from '../shared/events/login.event';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  directives: [FORM_DIRECTIVES, CORE_DIRECTIVES],
  providers: [
    Sha1, UserRepository, Sync, FinanceApi, AccountRepository, CategoryRepository,
    TransactionRepository, MyDate
  ]
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public errors: Array<string>;
  private _userRepository: UserRepository;
  private _sync: Sync;
  private _sha1: Sha1;
  private _router: Router;
  private _loadEvent: LoadEvent;
  private _loginEvent: LoginEvent;

  constructor(userRepository: UserRepository, sync: Sync, sha1: Sha1, router: Router,
    loginEvent: LoginEvent, loadEvent: LoadEvent) {
    this._userRepository = userRepository;
    this._sync = sync;
    this._sha1 = sha1;
    this._router = router;
    this._loadEvent = loadEvent;
    this._loginEvent = loginEvent;
  }

  ngOnInit() {
    this._userRepository.deleteUser();
    this._sync.deleteAllLocalData();
    this.errors = [];
    this._loginEvent.announceLogin('');
  }

  login(username: string, password: string): void {
    var hashedPassword = this._sha1.hash(password);
    var user = new User(username, hashedPassword);
    this._loadEvent.announceLoadStart('start');
    this._sync.getAllDataFromServer(user, () => this.afterLogin(user), () => this.onError());
  }

  afterLogin(user: User): void {
    this._userRepository.saveUser(user);
    this._router.navigate(['/transaction-list']);
    this._loginEvent.announceLogin(user.login);
    this._loadEvent.announceLoadEnd('finish');
  }

  onError(): void {
    this.errors.push('Usuário ou senha inválidos');
    this._loadEvent.announceLoadEnd('finish');
  }
}

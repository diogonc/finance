import {Injectable} from '@angular/core';
import {Sha1} from '../../services/sha1/sha1.service';
import {UserRepository} from '../../services/repository/user-repository.service';
import {Sync} from '../../services/sync/sync.service';
import {User} from '../../models/user.model';
import {LoadEvent} from '../../events/load.event';
import {LoginEvent} from '../../events/login.event';

@Injectable()
export class LoginApp {

  private userRepository: UserRepository;
  private sync: Sync;
  private sha1: Sha1;
  private loadEvent: LoadEvent;
  private loginEvent: LoginEvent;

  constructor(userRepository: UserRepository, sync: Sync, sha1: Sha1,
    loginEvent: LoginEvent, loadEvent: LoadEvent) {
    this.userRepository = userRepository;
    this.sync = sync;
    this.sha1 = sha1;
    this.loadEvent = loadEvent;
    this.loginEvent = loginEvent;
  }

  onInit(): void {
    this.userRepository.deleteUser();
    this.sync.deleteAllLocalData();
    this.loginEvent.announceLogin('');
  }

  login(username: string, password: string,
        onSucces: (user: User) => void,
        onError: (error) => void):
        void {
    var hashedPassword = this.sha1.hash(password);
    var user = new User(username, hashedPassword);
    this.loadEvent.announceLoadStart('start');
    this.sync.getAllDataFromServer(user,
       () => this.afterLogin(user, onSucces),
       () => this.afterErrorOnLogin(onError));
  }

  afterLogin(user: User, onSucces: (user: User) => void): void {
    this.userRepository.saveUser(user);
    this.loginEvent.announceLogin(user.login);
    this.loadEvent.announceLoadEnd('finish');
    onSucces(user);
  }

  afterErrorOnLogin(onError: (error: string) => void): void {
    this.loadEvent.announceLoadEnd('finish');
    onError('Usuário ou senha inválidos');
  }
}

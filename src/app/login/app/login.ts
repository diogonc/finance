import {Injectable} from '@angular/core';
import {Sha1} from '../sha1/sha1';
import {UserRepository} from '../../shared/services/repository/user-repository';
import {Sync} from '../../shared/services/sync/sync';
import {User} from '../../shared/models/user';
import {LoginEvent} from '../../events/login-event';

@Injectable()
export class LoginApp {

  private userRepository: UserRepository;
  private sync: Sync;
  private sha1: Sha1;
  private loginEvent: LoginEvent;

  constructor(userRepository: UserRepository, sync: Sync, sha1: Sha1,
    loginEvent: LoginEvent) {
    this.userRepository = userRepository;
    this.sync = sync;
    this.sha1 = sha1;
    this.loginEvent = loginEvent;
  }

  logout(): void {
    this.userRepository.deleteUser();
    this.sync.deleteAllLocalData();
    this.loginEvent.announceLogin('');
  }

  login(username: string, password: string,
        onSuccess: (user: User) => void,
        onError: (error) => void):
        void {
    let hashedPassword = this.sha1.hash(password);
    let user = new User(username, hashedPassword);
    this.sync.getAllDataFromServer(user,
       () => this.afterLogin(user, onSuccess),
       () => this.afterErrorOnLogin(onError));
  }

  afterLogin(user: User, onSucces: (user: User) => void): void {
    this.userRepository.saveUser(user);
    this.loginEvent.announceLogin(user.login);
    onSucces(user);
  }

  afterErrorOnLogin(onError: (error: string) => void): void {
    onError('Usuário ou senha inválidos');
  }
}

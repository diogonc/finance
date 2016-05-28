import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  let userRepository;
  let sync;
  let loginComponent;
  let sha1;
  let router;

  beforeEach(() => {
    userRepository = new UserRepository();
    sync = new Sync();
    sha1 = new Sha1();
    router = new Router();

    loginComponent = new LoginComponent(userRepository, sync, sha1, router);
  });

  it('should delete data on constructor', () => {
    loginComponent.ngOnInit();

    expect(userRepository.calledDelete).toEqual(true);
    expect(sync.calledDelete).toEqual(true);
  });

  it('should sync on login', () => {
    loginComponent.login('login', 'password');

    expect(sync.called).toEqual(true);
  });

  it('should save user on login', () => {
    loginComponent.login('login', 'password');

    expect(userRepository.calledSave).toEqual(true);
  });
});

class UserRepository {
  public calledSave: boolean = false;
  public calledDelete: boolean = false;

  saveUser(user: any): void { this.calledSave = true; }

  deleteUser(user: any): void { this.calledDelete = true; }
}

class Sync {
  public called: boolean = false;
  public calledDelete: boolean = false;

  getAllDataFromServer(user: any): void { this.called = true; }

  deleteAllLocalData(): void { this.calledDelete = true; }
}

class Sha1 {
  public called: boolean = false;

  hash(password: string): string {
    this.called = true;
    return 'hashed';
  }
}

class Router {
  navigate(comand: any): void { return null; }
}

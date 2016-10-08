/* tslint:disable:no-unused-variable */
import {User} from '../../models/user';
import {UserRepository} from './user-repository';

describe('User repository', () => {
  let repository;

  beforeEach(() => { repository = new UserRepository; });

  it('should save an user', () => {
    let user = new User('username', 'password');

    repository.saveUser(user);

    expect(repository.getUser().login).toEqual(user.login);
  });

  it('should return true if it is logged', () => {
    let user = new User('name', 'password');
    repository.saveUser(user);

    expect(repository.isLogged()).toBe(true);
  });

  it('should return false if it is not logged', () => {
    repository.deleteUser();

    expect(repository.isLogged()).toBe(false);
  });
});

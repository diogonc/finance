import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {User} from '../../models/user.model';
import {UserRepository} from './userRepository.service';

describe('User repository', () => {
  let repository;

  beforeEach(() => { repository = new UserRepository; });

  it('should save an user', () => {
    var user = new User('username', 'password');

    repository.saveUser(user);

    expect(repository.getUser().login).toEqual(user.login);
  });
});

import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {UserRepository} from '../repository/userRepository.service';
import {User} from '../../models/user.model';

describe('AuthService', () => {
  let authService;
  let userRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    authService = new AuthService(userRepository);
  });

  it('should return true if it is logged', () => {
    var user = new User('name', 'password');
    userRepository.saveUser(user);

    expect(authService.isLogged()).toBe(true);
  });

  it('should return false if it is not logged', () => {
    userRepository.deleteUser();

    expect(authService.isLogged()).toBe(false);
  });
});

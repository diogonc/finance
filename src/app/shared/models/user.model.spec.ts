import {describe, expect, it} from '@angular/core/testing';
import {User} from './user.model';

describe('User', () => {
  it('should create with constructor parameters', () => {
    var user = new User('name', 'password');

    expect(user.login).toEqual('name');
    expect(user.password).toEqual('password');
  });
});

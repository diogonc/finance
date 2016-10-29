/* tslint:disable:no-unused-variable */
import {User} from './user';

describe('User', () => {
  it('should create with constructor parameters', () => {
    let user = new User('name', 'password');

    expect(user.login).toEqual('name');
    expect(user.password).toEqual('password');
  });
});

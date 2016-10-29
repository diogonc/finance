/* tslint:disable:no-unused-variable */
import {Account} from './account';

describe('Account', () => {
  it('should create with constructor parameters', () => {
    let a = {uuid: '324', name: 'name', priority: 3};

    let account = new Account(a.uuid, a.name, a.priority);

    expect(account.uuid).toEqual(a.uuid);
    expect(account.name).toEqual(a.name);
    expect(account.priority).toEqual(a.priority);
  });
});

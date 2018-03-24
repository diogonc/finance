/* tslint:disable:no-unused-variable */
import { Account } from './account';
import { Owner } from './owner';

describe('Account', () => {
  it('should create with constructor parameters', () => {
    const o = new Owner('324', 'name', 3, 'login');
    const a = { uuid: '324', name: 'name', owner: o, priority: 3, };

    const account = new Account(a.uuid, a.name, a.owner, a.priority);

    expect(account.uuid).toEqual(a.uuid);
    expect(account.name).toEqual(a.name);
    expect(account.owner).toEqual(a.owner);
    expect(account.priority).toEqual(a.priority);
  });
});

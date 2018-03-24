/* tslint:disable:no-unused-variable */
import { Owner } from './owner';

describe('Owner', () => {
  it('should create with constructor parameters', () => {
    const o = { uuid: '324', name: 'name', priority: 3, login: 'login' };

    const owner = new Owner(o.uuid, o.name, o.priority, o.login);

    expect(owner.uuid).toEqual(o.uuid);
    expect(owner.name).toEqual(o.name);
    expect(owner.priority).toEqual(o.priority);
  });
});

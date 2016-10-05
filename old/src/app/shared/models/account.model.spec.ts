import {describe, expect, it} from '@angular/core/testing';
import {Account} from './account.model';

describe('Account', () => {
  it('should create with constructor parameters', () => {
    var a = {uuid: '324', name: 'name', priority: 3};

    var account = new Account(a.uuid, a.name, a.priority);

    expect(account.uuid).toEqual(a.uuid);
    expect(account.name).toEqual(a.name);
    expect(account.priority).toEqual(a.priority);
  });
});

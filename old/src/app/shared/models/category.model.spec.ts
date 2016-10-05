import {describe, expect, it} from '@angular/core/testing';
import {Category} from './category.model';

describe('Category', () => {
  it('should create with constructor parameters', () => {
    var c = {uuid: '324', name: 'name', type: 'debit', priority: 3};

    var category = new Category(c.uuid, c.name, c.type, c.priority);

    expect(category.uuid).toEqual(c.uuid);
    expect(category.name).toEqual(c.name);
    expect(category.type).toEqual(c.type);
    expect(category.priority).toEqual(c.priority);
  });
});

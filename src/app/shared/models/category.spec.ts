/* tslint:disable:no-unused-variable */
import {Category} from './category';

describe('Category', () => {
  it('should create with constructor parameters', () => {
    const c = {uuid: '324', name: 'name', categoryType: 'debit', priority: 3};

    const category = new Category(c.uuid, c.name, c.categoryType, c.priority);

    expect(category.uuid).toEqual(c.uuid);
    expect(category.name).toEqual(c.name);
    expect(category.categoryType).toEqual(c.categoryType);
    expect(category.priority).toEqual(c.priority);
  });

  it('should fill error if fieds are not filled', () => {
    const category = new Category(null, null, null, null);

    expect(category.isValid()).toEqual(false);
    expect(category.errors.length).toEqual(3);
  });
});

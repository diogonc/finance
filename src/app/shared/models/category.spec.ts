/* tslint:disable:no-unused-variable */
import { Category } from './category';
import { CategoryType } from './categoryType';
import { Group } from './group';

describe('Category', () => {
  it('should create with constructor parameters', () => {
    const group = new Group('33', 'name', CategoryType.Debit, 1);
    const c = { uuid: '324', name: 'name', categoryType: CategoryType.Debit, group: group, priority: 3 };

    const category = new Category(c.uuid, c.name, c.categoryType, c.group, c.priority);

    expect(category.uuid).toEqual(c.uuid);
    expect(category.name).toEqual(c.name);
    expect(category.categoryType).toEqual(c.categoryType);
    expect(category.group).toEqual(c.group);
    expect(category.priority).toEqual(c.priority);
  });

  it('should fill error if fieds are not filled', () => {
    const category = new Category(null, null, null, null, null);

    expect(category.isValid()).toEqual(false);
    expect(category.errors.length).toEqual(3);
  });
});

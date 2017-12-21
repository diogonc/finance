/* tslint:disable:no-unused-variable */
import { Group } from './group';

describe('Group', () => {
  it('should create with constructor parameters', () => {
    const c = { uuid: '324', name: 'name', priority: 3 };

    const group = new Group(c.uuid, c.name, c.priority);

    expect(group.uuid).toEqual(c.uuid);
    expect(group.name).toEqual(c.name);
    expect(group.priority).toEqual(c.priority);
  });

  it('should fill error if fieds are not filled', () => {
    const group = new Group(null, null, null);

    expect(group.isValid()).toEqual(false);
    expect(group.errors.length).toEqual(2);
  });
});

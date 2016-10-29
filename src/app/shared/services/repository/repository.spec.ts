/* tslint:disable:no-unused-variable */
import {Repository} from './repository';

describe('Repository', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository('test');
    repository.deleteAll();
  });

  it('should save an object', () => {
    let object = { uuid: '1', name: 'name', age: 'age' };

    repository.save(object);

    let data = repository.get('1');
    expect(data.name).toEqual(object.name);
  });

  it('should update an object', () => {
    let object = { uuid: '1', name: 'name', age: 'age' };

    repository.save(object);
    object.name = 'new name';
    repository.save(object);

    let data = repository.get('1');
    expect(data.name).toEqual(object.name);
  });

  it('should save all data', () => {
    let objects = [{ uuid: '1', name: 'name', age: 'age' }, { uuid: '2', name: 'name2', age: 'age2' }];

    repository.saveAll(objects);

    let dataObjects = repository.getAll();
    expect(dataObjects[0].name).toEqual('name');
  });

  it('should delete all data', () => {
    let objects = [{ uuid: '1', name: 'name', age: 'age' }, { uuid: '2', name: 'name2', age: 'age2' }];

    repository.saveAll(objects);
    repository.deleteAll();

    let dataObjects = repository.getAll();
    expect(dataObjects.length).toEqual(0);
  });

  it('should delete an item', () => {
    let object = { uuid: '1', name: 'name', age: 'age' };

    repository.save(object);
    repository.delete('1');

    let dataObjects = repository.getAll();
    expect(dataObjects.length).toEqual(0);
  });
});

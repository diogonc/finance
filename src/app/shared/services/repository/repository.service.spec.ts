import {beforeEach, describe, expect, it} from '@angular/core/testing';
import {Repository} from './repository.service';

describe('Repository', () => {
  let repository;

  beforeEach(() => {
    repository = new Repository('test');
    repository.deleteAll();
  });

  it('should save an object', () => {
    var object = { uuid: '1', name: 'name', age: 'age' };

    repository.save(object);

    var data = repository.get('1');
    expect(data.name).toEqual(object.name);
  });

  it('should update an object', () => {
    var object = { uuid: '1', name: 'name', age: 'age' };

    repository.save(object);
    object.name = 'new name';
    repository.save(object);

    var data = repository.get('1');
    expect(data.name).toEqual(object.name);
  });

  it('should save all data', () => {
    var objects = [{ uuid: '1', name: 'name', age: 'age' }, { uuid: '2', name: 'name2', age: 'age2' }];

    repository.saveAll(objects);

    var dataObjects = repository.getAll();
    expect(dataObjects[0].name).toEqual('name');
  });

  it('should delete all data', () => {
    var objects = [{ uuid: '1', name: 'name', age: 'age' }, { uuid: '2', name: 'name2', age: 'age2' }];

    repository.saveAll(objects);
    repository.deleteAll();

    var dataObjects = repository.getAll();
    expect(dataObjects.length).toEqual(0);
  });

  it('should delete an item', () => {
    var object = { uuid: '1', name: 'name', age: 'age' };

    repository.save(object);
    repository.delete('1');

    var dataObjects = repository.getAll();
    expect(dataObjects.length).toEqual(0);
  });
});

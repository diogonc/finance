/* tslint:disable:no-unused-variable */
import {MyArray} from './my-array';

describe('My array', () => {

  it('it should find index', () => {
    let array = [
      {uuid: '3', name: 32234},
      {uuid: '4', name: 324234}
    ];

    expect(MyArray.findIndex('4', array)).toEqual(1);
  });

  it('should find index if array is not of objects', () => {
   let array = ['3', '4' ];

    expect(MyArray.findIndex('4', array)).toEqual(1);
  });

  it('should return true if has value', () => {
   let array = ['3', '4' ];

    expect(MyArray.any('4', array)).toEqual(true);
  });

  it('should return false if doesnt have value', () => {
   let array = ['3', '4' ];

    expect(MyArray.any('5', array)).toEqual(false);
  });
});

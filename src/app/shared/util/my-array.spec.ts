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
});

/* tslint:disable:no-unused-variable */
import {MyDate} from './my-date';

describe('DateService', () => {

  it('should convert a date from us string', () => {
    let dateConverted = MyDate.convertToDateFromString('2010-04-04');

    expect(dateConverted).toEqual(new Date(2010, 3, 4));
  });

  it('shuld return null if date is not valid', () => {
    let dateConverted = MyDate.convertToDateFromString(null);

    expect(dateConverted).toEqual(null);
  });

  it('should converte a date to yyyy-mm-dd', () => {
    let date = new Date(2011, 2, 3);

    let dateConverted = MyDate.convertToUsString(date);

    expect(dateConverted).toEqual('2011-03-03');
  });
});

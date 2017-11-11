/* tslint:disable:no-unused-variable */
import { MyDate } from './my-date';

describe('DateService', () => {

  it('should convert a date from us string', () => {
    const dateConverted = MyDate.convertToDateFromString('2010-04-04');

    expect(dateConverted).toEqual(new Date(2010, 3, 4));
  });

  it('shuld return null if date is not valid', () => {
    const dateConverted = MyDate.convertToDateFromString(null);

    expect(dateConverted).toEqual(null);
  });

  it('should converte a date to yyyy-mm-dd', () => {
    const date = new Date(2011, 2, 3);

    const dateConverted = MyDate.convertToUsString(date);

    expect(dateConverted).toEqual('2011-03-03');
  });

  it('should get last date of a month', () => {
    const today = new Date();
    const lastDay = MyDate.getLastDayOfMonth();

    expect(lastDay).toEqual(new Date(today.getFullYear(), today.getMonth() + 1, 0));
  });

  it('should get last date of a month on january', () => {
    const today = new Date(2017, 0, 1);
    const lastDay = MyDate.getLastDayOfMonth(today);

    expect(lastDay).toEqual(new Date(2017, 0, 31));
  });

  it('should get last date of a month on february', () => {
    const today = new Date(2017, 1, 1);
    const lastDay = MyDate.getLastDayOfMonth(today);

    expect(lastDay).toEqual(new Date(2017, 1, 28));
  });
});

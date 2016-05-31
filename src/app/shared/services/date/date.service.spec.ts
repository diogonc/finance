import {describe, expect, it} from '@angular/core/testing';
import {DateService} from './date.service';

describe('DateService', () => {

  it('should convert a date from us string', () => {
    var dateConverted = DateService.convertToDateFromString('2010-04-04');

    expect(dateConverted).toEqual(new Date(2010, 3, 4));
  });

  it('should converte a date to yyyy-mm-dd', () => {
    var date = new Date(2011, 2, 3);

    var dateConverted = DateService.convertToUsString(date);

    expect(dateConverted).toEqual('2011-03-03');
  });
});

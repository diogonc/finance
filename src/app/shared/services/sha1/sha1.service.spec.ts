import {describe, expect, it} from '@angular/core/testing';
import {Sha1} from './sha1.service';

describe('Sha1', () => {

  it('should hash a string', () => {
    var stringTest = 'test';
    var sha1 = new Sha1();

    var hashedString = sha1.hash(stringTest);

    expect(hashedString).toEqual('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  });
});

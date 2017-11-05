/* tslint:disable:no-unused-variable */
import { } from './sha1';

describe('Sha1', () => {
  it('should hash a string', () => {
    let stringTest = 'test';
    let sha1 = new Sha1();

    let hashedString = sha1.hash(stringTest);

    expect(hashedString).toEqual('a94a8fe5ccb19ba61c4c0873d391e987982fbbd3');
  });
});

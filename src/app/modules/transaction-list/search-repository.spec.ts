import {SearchRepository} from './search-repository';

describe('Search', () => {
  let repository;

   beforeEach(() => {
    repository  = new SearchRepository();
    repository.deleteAll();
  });

  it('should create an instance', () => {
    expect(repository).toBeTruthy();
  });
});

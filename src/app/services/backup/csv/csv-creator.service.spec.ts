/* tslint:disable:no-unused-variable */
import { CsvCreatorService } from './csv-creator.service';

describe('Service: CsvCreator', () => {
  let service;

  beforeEach(() => {
    service = new CsvCreatorService();
  });

  it('shuld convert json to csv', () => {
    let data = [
                {uuid: 234234, value: 2342.3 }
               ];

    let csv = service.convert(data);

    expect(csv).toEqual('uuid, value\n234234, 2342.3');
  });

  it('shuld convert json to csv with multiple lines', () => {
    let data = [
                {uuid: 234234, value: 2342.3 },
                {uuid: 111111, value: 11.1 }
               ];

    let csv = service.convert(data);

    expect(csv).toEqual('uuid, value\n234234, 2342.3\n111111, 11.1');
  });
});

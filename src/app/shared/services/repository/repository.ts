import {MyArray} from '../../util/my-array';

export class Repository {
  private key: string;

  constructor(key: string) { this.key = key; }

  save(object): void {
    let dataObject = this.makeACopy(object);
    let key = object.uuid;
    let data = this.getData();
    let index = MyArray.findIndex(key, data);

    if (index >= 0) {
      data.splice(index, 1, dataObject);
    } else {
      data.push(dataObject);
    }
    this.setData(data);
  }

  saveAll(objects): void { this.setData(objects); }

  get(key: string): any {
    let data = this.getData();
    let index = MyArray.findIndex(key, data);

    return index >= 0 ? data[index] : null;
  }

  delete(key: string): void {
    let data = this.getData();
    let index = MyArray.findIndex(key, data);

    if (index >= 0) {
      data.splice(index, 1);
    }
    this.setData(data);
  }

  getAll(): Array<any> { return this.makeACopy(this.getData()); }

  deleteAll(): void { this.setData('[]'); };

  protected makeACopy(object): any { return JSON.parse(JSON.stringify(object)); }

  protected getData(): any {
    let data = JSON.parse(localStorage.getItem(this.key));
    return (data !== null) ? data : [];
  }

  protected setData(data: any): void {
    let jsonData = typeof(data) === 'string' ? JSON.parse(data) : data;
    localStorage.setItem(this.key, JSON.stringify(jsonData));
  }
}

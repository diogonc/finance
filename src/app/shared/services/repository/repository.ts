import { MyArray } from '../../util/my-array';

export class Repository {
  private key: string;

  constructor(key: string) { this.key = key; }

  save(object): void {
    const key = object.uuid;
    const list = this.getListOfObjects();
    const index = MyArray.findIndex(key, list);

    if (index >= 0) {
      list.splice(index, 1, object);
    } else {
      list.push(object);
    }
    this.setData(list);
  }

  saveAll(listOfObjects): void { this.setData(listOfObjects); }

  get(key: string): any {
    const list = this.getListOfObjects();
    const index = MyArray.findIndex(key, list);

    return index >= 0 ? list[index] : null;
  }

  delete(key: string): void {
    const list = this.getListOfObjects();
    const index = MyArray.findIndex(key, list);

    if (index >= 0) {
      list.splice(index, 1);
    }
    this.setData(list);
  }

  getAll(): Array<any> { return this.getListOfObjects(); }

  deleteAll(): void { this.setData('[]'); }

  protected makeACopy(object): any { return JSON.parse(JSON.stringify(object)); }

  protected getListOfObjects(): any {
    const data = JSON.parse(localStorage.getItem(this.key));
    return (data !== null) ? data : [];
  }

  protected setData(data: any): void {
    const jsonData = typeof (data) === 'string' ? JSON.parse(data) : data;
    localStorage.setItem(this.key, JSON.stringify(jsonData));
  }
}

import {Repository} from './repository';
import {Category} from '../../models/category';

export class CategoryRepository extends Repository {
  constructor() { super('category'); }

  getAll(): Array<Category> {
    let data = this.makeACopy(this.getData());
    let accounts = [];

    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      accounts.push(new Category(item.uuid, item.name, item.categoryType, item.priority));
    }

    return this.order(accounts);
  }

  getCreditTransfer(): Category {
    return this.getFiltered('creditTransfer');
  }

  getDebitTransfer(): Category {
    return this.getFiltered('debitTransfer');
  }

  private order(data: Array<Category>): Array<Category> {
    return data.sort(function (item, anotherItem) {
      return anotherItem.priority - item.priority;
    });
  }

  private getFiltered(categoryType: string): Category {
    let categories = this.getAll();
    let lenght = categories.length;

    for (let i = 0; i < lenght; i++) {
      let c = categories[i];

      if (c.type === categoryType) {
        return c;
      }
    }
  }
}

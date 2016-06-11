import {Repository} from './repository.service';
import {Category} from '../../models/category.model';

export class CategoryRepository extends Repository {
  constructor() { super('category'); }

  getAll(): Array<Category> {
    var data = this.makeACopy(this.getData());
    var accounts = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
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
    var categories = this.getAll();
    var lenght = categories.length;

    for (var i = 0; i < lenght; i++) {
      var c = categories[i];

      if (c.type === categoryType) {
        return c;
      }
    }
  }
}

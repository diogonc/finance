import {Repository} from './repository.service';
import {Category} from '../../models/category.model';

export class CategoryRepository extends Repository {
  constructor() { super('category'); }

  getAll(): Array<Category> {
    var data = this.makeACopy(this.getData());
    var accounts = [];

    for (var i = 0; i < data.length; i++) {
      var item = data[i];
      accounts.push(new Category(item.uuid, item.name, item.type, item.priority));
    }

    return this.order(accounts);
  }

  private order(data: Array<Category>): Array<Category> {
    return data.sort(function (item, anotherItem) {
      return anotherItem.priority - item.priority;
    });
  }
}

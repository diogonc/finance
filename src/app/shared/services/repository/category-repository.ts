import { Repository } from './repository';
import { Category } from '../../models/category';
import { CategoryType } from '../../models/categoryType';

export class CategoryRepository extends Repository {
  constructor() { super('category'); }

  getAll(): Array<Category> {
    const list = this.getListOfObjects();
    const itens = [];

    for (let i = 0; i < list.length; i++) {
      itens.push(list[i] as Category);
    }

    return this.sortByPriorityAndName(itens);
  }

  getCreditTransfer(): Category {
    return this.getByCategoryType(CategoryType.CreditTransfer);
  }

  getDebitTransfer(): Category {
    return this.getByCategoryType(CategoryType.DebitTransfer);
  }

  private sortByPriorityAndName(data: Array<Category>): Array<Category> {
    return data.sort(function (item, anotherItem) {
      if (anotherItem.priority - item.priority !== 0) {
        return anotherItem.priority - item.priority;
      }
      return anotherItem.name.localeCompare(item.name);
    });
  }

  private getByCategoryType(categoryType: CategoryType): Category {
    const categories = this.getAll();
    const lenght = categories.length;

    for (let i = 0; i < lenght; i++) {
      const c = categories[i];

      if (c.categoryType === categoryType) {
        return c;
      }
    }
  }
}

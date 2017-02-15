import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Category } from '../shared/models/category';
import { CategoryType } from '../shared/models/categoryType';
import { CategoryRepository } from '../shared/services/repository/category-repository';
import { UserRepository } from '../shared/services/repository/user-repository';
import { FinanceApi } from '../shared/services/api/finance-api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public category: Category;
  public types: Array<CategoryType>;
  public typeIndex: number;
  public isRequesting: boolean;
  public isNew: boolean;
  public showList: boolean;
  public errors: Array<string>;

  private route: ActivatedRoute;
  private router: Router;
  private categoryRepository: CategoryRepository;
  private userRepository: UserRepository;
  private api: FinanceApi;

  constructor(route: ActivatedRoute, router: Router, categoryRepository: CategoryRepository,
    userRepository: UserRepository, financeApi: FinanceApi) {
    this.route = route;
    this.router = router;
    this.categoryRepository = categoryRepository;
    this.userRepository = userRepository;
    this.api = financeApi;
  }

  ngOnInit() {
    this.types = CategoryType.getTypes();

    const uuid = this.route.snapshot.params['id'];
    if (typeof (uuid) !== 'undefined' && uuid !== null) {
      const category = this.categoryRepository.get(uuid);
      this.category = new Category(category.uuid, category.name, category.categoryType, category.priority);
      this.typeIndex = CategoryType.getTypeIndex(this.category.categoryType);
      this.isNew = false;
    } else {
      this.isNew = true;
      this.category = new Category(null, '', 'debit', 1);
      this.typeIndex = 1;
    }
  }

  save(showList: boolean) {
    const user = this.userRepository.getUser();
    this.isRequesting = true;
    if (this.typeIndex) {
      this.category.categoryType = this.types[(this.typeIndex)].uuid;
    }

    this.category.propertyUuid = user.property;

    if (!this.category.isValid()) {
      this.onError(this.category.errors);
      return;
    }

    if (this.category.uuid === null) {
      this.api.saveCategory(this.category, user,
        (response) => {
          this.category.uuid = response._body;
          this.onSave(this.category, this.onSuccess.bind(this))
        },
        this.onError.bind(this));
    } else {
      this.api.updateCategory(this.category, user,
        () => this.onSave(this.category, this.onSuccess.bind(this)),
        this.onError.bind(this));
    }
    this.showList = showList;
  };

  delete() {
    this.isRequesting = true;
    const uuid = this.category.uuid;
    if (uuid === null) {
      return;
    }
    const user = this.userRepository.getUser();
    this.api.deleteCategory(uuid, user,
      () => this.onDelete(uuid, this.onSuccess.bind(this)),
      this.onError.bind(this));
  };

  back() {
    this.router.navigate(['/category-list']);
  }

  private onSave(category: Category, onSuccess: () => void) {
    this.categoryRepository.save(category);
    onSuccess();
  };

  private onDelete(categoryUuid: string, onSuccess: () => void) {
    this.categoryRepository.delete(categoryUuid);
    this.isRequesting = false;
    this.router.navigate(['/category-list']);
    onSuccess();
  };

  private onSuccess() {
    this.isRequesting = false;
    if (this.showList) {
      this.router.navigate(['/category-list']);
    } else {
      this.isNew = true;
      this.category = new Category(null, '', 'debit', 1);
    }
  };

  private onError(errors) {
    this.isRequesting = false;
    this.errors = errors;
  }
}

class CategoryApp {

}

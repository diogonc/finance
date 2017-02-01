import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MyArray } from '../shared/util/my-array';
import { Category } from '../shared/models/category';
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
  public types: Array<Object>;
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
    this.types = this.getTypes();

    const uuid = this.route.snapshot.params['id'];
    if (typeof (uuid) !== 'undefined' && uuid !== null) {
      this.category = this.categoryRepository.get(uuid);
      this.typeIndex = this.getTypeIndex(this.category.categoryType);
      this.isNew = false;
    } else {
      this.isNew = true;
      this.category = new Category(null, '', 'debit', 1);
    }
  }

  save(showList: boolean) {
    const user = this.userRepository.getUser();
    this.isRequesting = true;
    this.category.categoryType = String(this.types[(this.typeIndex)]);
    this.category.propertyUuid = user.property;

    if (!this.category.isValid()) {
      this.onError(this.category.errors);
      return;
    }

    if (this.category.uuid === null) {
      this.api.saveCategory(this.category, user,
        () => this.onSave(this.category, this.onSuccess),
        this.onError);
    } else {
      this.api.updateCategory(this.category, user,
        () => this.onSave(this.category, this.onSuccess),
        this.onError);
    }
    this.showList = showList;
  };

  delete() {
    this.isRequesting = true;
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
    onSuccess();
  };

  private onSuccess() {
    this.isRequesting = false;
    if (this.showList) {
      this.router.navigate(['/category-list']);
    } else {
      // this.transactionVm = this.transactionApp.load(null, null, null);
    }
  };

  private onError(errors) {
    this.isRequesting = false;
    this.errors = errors;
  }

  private onDelete2() {
    this.isRequesting = false;
    this.router.navigate(['/category-list']);
  };

  private getTypes(): Array<Object> {
    return [
      { uuid: 'credit', name: 'Crédito' },
      { uuid: 'debit', name: 'Débito' },
      { uuid: 'creditTransfer', name: 'Tranferência de crédito' },
      { uuid: 'debitTransfer', name: 'Transferência de débito' }];
  }

  private getTypeIndex(key: string): number {
    const types = this.getTypes();
    return MyArray.findIndex(key, types);
  }
}

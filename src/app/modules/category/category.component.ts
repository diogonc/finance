import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MyArray } from '../../shared/util/my-array';
import { Category } from '../../shared/models/category';
import { Group } from '../../shared/models/group';
import { CategoryType } from '../../shared/models/categoryType';
import { CategoryRepository } from '../../shared/services/repository/category-repository';
import { GroupRepository } from '../../shared/services/repository/group-repository';
import { UserRepository } from '../../shared/services/repository/user-repository';
import { FinanceApi } from '../../shared/services/api/finance-api';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public category: Category;
  public types: Array<string>;
  public groups: Array<Group>;
  public typeIndex: number;
  public groupIndex: number;
  public isRequesting: boolean;
  public isNew: boolean;
  public showList: boolean;
  public errors: Array<string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryRepository: CategoryRepository,
    private groupRepository: GroupRepository,
    private userRepository: UserRepository,
    private api: FinanceApi) {
    this.isRequesting = false;
  }

  ngOnInit() {
    this.types = ['', 'Crédito', 'Débito', 'Tranferência de crédito', 'Tranferência de débito'];
    this.groups = this.groupRepository.getAll();

    const uuid = this.route.snapshot.params['id'];
    if (typeof (uuid) !== 'undefined' && uuid !== null) {
      const category = this.categoryRepository.get(uuid);
      this.category = new Category(category.uuid, category.name, category.categoryType, category.group, category.priority);
      this.typeIndex = this.category.categoryType;
      if (category.group !== null) {
        this.groupIndex = MyArray.findIndex(category.group.uuid, this.groups);
      }
      this.isNew = false;
    } else {
      this.isNew = true;
      this.category = new Category(null, '', CategoryType.Debit, null, 1);
      this.typeIndex = 1;
      this.groupIndex = 0;
    }
  }

  save(showList: boolean) {
    const user = this.userRepository.getUser();
    this.isRequesting = true;
    if (this.typeIndex) {
      this.category.categoryType = this.typeIndex;
    }

    const group = this.groups[this.groupIndex];
    const category = new Category(this.category.uuid, this.category.name, this.category.categoryType, group, this.category.priority);
    category.propertyUuid = user.property;

    if (!category.isValid()) {
      this.onError(category.errors);
      return;
    }

    if (category.uuid === null) {
      this.api.saveCategory(category,
        (response) => {
          this.category.uuid = response.uuid;
          this.onSave(category, this.onSuccess.bind(this));
        },
        this.onError.bind(this));
    } else {
      this.api.updateCategory(category,
        () => this.onSave(category, this.onSuccess.bind(this)),
        this.onError.bind(this));
    }
    this.showList = showList;
  }

  delete() {
    this.isRequesting = true;
    const uuid = this.category.uuid;
    if (uuid === null) {
      return;
    }
    this.api.deleteCategory(uuid,
      () => this.onDelete(uuid, this.onSuccess.bind(this)),
      this.onError.bind(this));
  }

  back() {
    this.router.navigate(['/category-list']);
  }

  private onSave(category: Category, onSuccess: () => void) {
    this.categoryRepository.save(category);
    onSuccess();
  }

  private onDelete(categoryUuid: string, onSuccess: () => void) {
    this.categoryRepository.delete(categoryUuid);
    this.isRequesting = false;
    this.router.navigate(['/category-list']);
    onSuccess();
  }

  private onSuccess() {
    this.isRequesting = false;
    if (this.showList) {
      this.router.navigate(['/category-list']);
    } else {
      this.isNew = true;
      this.category = new Category(null, '', CategoryType.Debit, null, 1);
    }
  }

  private onError(errors) {
    this.isRequesting = false;
    this.errors = errors;
  }
}


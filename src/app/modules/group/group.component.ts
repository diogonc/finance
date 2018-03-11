import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Group } from '../../shared/models/group';
import { CategoryType } from '../../shared/models/categoryType';
import { GroupRepository } from '../../shared/services/repository/group-repository';
import { UserRepository } from '../../shared/services/repository/user-repository';
import { FinanceApi } from '../../shared/services/api/finance-api';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public group: Group;
  public types: Array<string>;
  public typeIndex: number;
  public isRequesting: boolean;
  public isNew: boolean;
  public showList: boolean;
  public errors: Array<string>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private groupRepository: GroupRepository,
    private userRepository: UserRepository,
    private api: FinanceApi) { }

  ngOnInit() {
    this.types = ['', 'Crédito', 'Débito', 'Tranferência de crédito', 'Tranferência de débito'];

    const uuid = this.route.snapshot.params['id'];
    if (typeof (uuid) !== 'undefined' && uuid !== null) {
      const group = this.groupRepository.get(uuid);
      this.group = new Group(group.uuid, group.name, group.categoryType, group.priority);
      this.typeIndex = this.group.categoryType;
      this.isNew = false;
    } else {
      this.isNew = true;
      this.group = new Group(null, '', CategoryType.Debit, 1);
      this.typeIndex = 2;
    }
  }

  save(showList: boolean) {
    const user = this.userRepository.getUser();
    this.isRequesting = true;
    this.group.categoryType = this.typeIndex !== 0 ? this.typeIndex : CategoryType.Debit;

    const group = new Group(this.group.uuid, this.group.name, this.group.categoryType, this.group.priority);
    group.propertyUuid = user.property;

    if (!group.isValid()) {
      this.onError(group.errors);
      return;
    }
    if (group.uuid === null) {
      this.api.saveGroup(group,
        (response) => {
          this.group.uuid = response.uuid;
          this.onSave(group, this.onSuccess.bind(this));
        },
        this.onError.bind(this));
    } else {
      this.api.updateGroup(group,
        () => this.onSave(group, this.onSuccess.bind(this)),
        this.onError.bind(this));
    }
    this.showList = showList;
  }

  delete() {
    this.isRequesting = true;
    const uuid = this.group.uuid;
    if (uuid === null) {
      return;
    }
    this.api.deleteGroup(uuid,
      () => this.onDelete(uuid, this.onSuccess.bind(this)),
      this.onError.bind(this));
  }

  back() {
    this.router.navigate(['/group-list']);
  }

  private onSave(group: Group, onSuccess: () => void) {
    this.groupRepository.save(group);
    onSuccess();
  }

  private onDelete(groupUuid: string, onSuccess: () => void) {
    this.groupRepository.delete(groupUuid);
    this.isRequesting = false;
    this.router.navigate(['/group-list']);
    onSuccess();
  }

  private onSuccess() {
    this.isRequesting = false;
    if (this.showList) {
      this.router.navigate(['/group-list']);
    } else {
      this.isNew = true;
      this.group = new Group(null, '', CategoryType.Debit, 1);
    }
  }

  private onError(errors) {
    this.isRequesting = false;
    this.errors = errors;
  }
}

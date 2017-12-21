import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Group } from '../../shared/models/group';
import { GroupRepository } from '../../shared/services/repository/group-repository';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  public groups: Array<Group>;

  constructor(private groupRepository: GroupRepository,
    private router: Router) { }

  ngOnInit() {
    this.groups = this.groupRepository.getAll();
  }

  edit(uuid: string) {
    this.router.navigate(['/group-edit', uuid]);
  }

  new() {
    this.router.navigate(['/group-new']);
  }
}

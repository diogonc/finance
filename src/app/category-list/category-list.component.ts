import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from '../shared/models/category';
import { CategoryRepository } from '../shared/services/repository/category-repository';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public categories: Array<Category>;
  private categoryRepository: CategoryRepository;
  private router: Router;

  constructor(categoryRepository: CategoryRepository, router: Router) {
    this.categoryRepository = categoryRepository;
    this.router = router;
  }

  ngOnInit() {
    this.categories = this.categoryRepository.getAll();
  }

  edit(uuid: string) {
    this.router.navigate(['/category-edit', uuid]);
  }

  new() {
    this.router.navigate(['/category-new']);
  }
}

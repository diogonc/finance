import { Component, OnInit } from '@angular/core';
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

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  ngOnInit() {
    this.categories = this.categoryRepository.getAll();
  }
}

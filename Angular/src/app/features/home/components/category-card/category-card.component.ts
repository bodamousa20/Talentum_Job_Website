import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category, categoryIcons } from '@core/models/category';
import { CategoryService } from '@core/services';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent {
  @Input() category!: Category;
  @Input() isSelected!: boolean;
  @Output() onSelect = new EventEmitter<void>();
  jobCountPerCategory!: number;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getJobsCountPerCategory();
    this.category.icon = categoryIcons[this.category.name];
  }

  getJobsCountPerCategory() {
    this.categoryService
      .getNumberOfJobsPerCategory(this.category.id)
      .subscribe((count) => {
        this.jobCountPerCategory = count;
      });
  }

  onClick(): void {
    this.onSelect.emit();
  }
}

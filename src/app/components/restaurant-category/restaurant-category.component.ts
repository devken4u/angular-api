import { Component, OnInit } from '@angular/core';
import { RestaurantCategory } from '../../model/restaurant-category';
import { NgForm } from '@angular/forms';
import { RestaurantCategoryService } from '../../services/restaurant-category.service';

@Component({
  selector: 'app-restaurant-category',
  templateUrl: './restaurant-category.component.html',
  styleUrls: ['./restaurant-category.component.css'],
})
export class RestaurantCategoryComponent implements OnInit {
  categories: RestaurantCategory[] = [];

  constructor(private categoryService: RestaurantCategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error(err),
    });
  }

  createCategory(form: NgForm) {
    if (form.invalid) {
      alert('Please provide a valid category name.');
      return;
    }

    this.categoryService.createCategory({ name: form.value.name }).subscribe({
      next: () => {
        this.getCategories();
        form.reset();
        alert('Category added successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Error adding category');
      },
    });
  }

  updateCategory(
    categoryUuid: string | undefined,
    category: RestaurantCategory
  ) {
    if (!categoryUuid) {
      alert('Invalid category ID');
      return;
    }

    const newName = prompt('Enter new category name:', category.name || '');
    if (!newName) {
      alert('Update canceled. Name is required.');
      return;
    }

    this.categoryService
      .updateCategory(categoryUuid, { name: newName })
      .subscribe({
        next: () => {
          alert('Category updated successfully');
          this.getCategories();
        },
        error: (err) => {
          console.error(err);
          alert('Error updating category');
        },
      });
  }

  deleteCategory(categoryUuid: string | undefined) {
    if (!categoryUuid) {
      alert('Invalid category ID');
      return;
    }

    this.categoryService.deleteCategory(categoryUuid).subscribe({
      next: () => {
        alert('Category deleted successfully');
        this.getCategories();
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting category');
      },
    });
  }

  viewCategoryDetails(categoryUuid: string | undefined) {
    if (!categoryUuid) {
      alert('Invalid category ID');
      return;
    }

    this.categoryService.getCategoryById(categoryUuid).subscribe({
      next: (data) => {
        const details = `
          Category Details:
          ID: ${data.category_id}
          UUID: ${data.category_uuid}
          Name: ${data.name}
          Created At: ${data.created_at}
          Updated At: ${data.updated_at}
        `;
        alert(details);
      },
      error: (err) => console.error(err),
    });
  }
}

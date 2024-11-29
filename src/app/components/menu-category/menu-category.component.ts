import { Component, OnInit } from '@angular/core';
import { MenuCategory } from '../../model/menu-category';
import { NgForm } from '@angular/forms';
import { MenuCategoryService } from '../../services/menu-category.service';

@Component({
  selector: 'app-menu-category',
  templateUrl: './menu-category.component.html',
  styleUrls: ['./menu-category.component.css'],
})
export class MenuCategoryComponent implements OnInit {
  menuCategories: MenuCategory[] = [];

  constructor(private menuCategoryService: MenuCategoryService) {}

  ngOnInit(): void {
    this.getMenuCategories();
  }

  getMenuCategories() {
    this.menuCategoryService.getMenuCategories().subscribe({
      next: (data) => (this.menuCategories = data),
      error: (err) => console.error(err),
    });
  }

  createMenuCategory(form: NgForm) {
    if (form.invalid) {
      alert('Please provide a valid menu category name.');
      return;
    }

    this.menuCategoryService
      .createMenuCategory({ name: form.value.name })
      .subscribe({
        next: () => {
          this.getMenuCategories();
          form.reset();
          alert('Menu category added successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Error adding menu category');
        },
      });
  }

  updateMenuCategory(menuUuid: string | undefined, category: MenuCategory) {
    if (!menuUuid) {
      alert('Invalid menu category ID');
      return;
    }

    const newName = prompt(
      'Enter new menu category name:',
      category.name || ''
    );
    if (!newName) {
      alert('Update canceled. Name is required.');
      return;
    }

    this.menuCategoryService
      .updateMenuCategory(menuUuid, { name: newName })
      .subscribe({
        next: () => {
          alert('Menu category updated successfully');
          this.getMenuCategories();
        },
        error: (err) => {
          console.error(err);
          alert('Error updating menu category');
        },
      });
  }

  deleteMenuCategory(menuUuid: string | undefined) {
    if (!menuUuid) {
      alert('Invalid menu category ID');
      return;
    }

    this.menuCategoryService.deleteMenuCategory(menuUuid).subscribe({
      next: () => {
        alert('Menu category deleted successfully');
        this.getMenuCategories();
      },
      error: (err) => {
        console.error(err);
        alert('Error deleting menu category');
      },
    });
  }

  viewMenuCategoryDetails(menuUuid: string | undefined) {
    if (!menuUuid) {
      alert('Invalid menu category ID');
      return;
    }

    this.menuCategoryService.getMenuCategoryById(menuUuid).subscribe({
      next: (data) => {
        const details = `
          Menu Category Details:
          ID: ${data.menu_id}
          UUID: ${data.menu_uuid}
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

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MenuService } from '../../services/menu.service';
import { Menu } from '../../model/menu';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menus: Menu[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.menuService.getAllMenus().subscribe({
      next: (data) => (this.menus = data),
      error: (err) => console.error(err),
    });
  }

  createMenu(form: NgForm) {
    if (form.invalid) {
      alert('Please fill out all the fields correctly.');
      return;
    }

    const menu: Menu = { ...form.value };

    this.menuService.createMenu(menu).subscribe({
      next: () => {
        this.getMenus();
        form.reset();
        alert('Menu created successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Error creating menu. Please check the console.');
      },
    });
  }

  toggleAvailability(event: Event) {
    const input = event.target as HTMLInputElement;
    input.checked = !input.checked;
  }

  updateMenu(menuUUID: string | undefined, menu: Menu) {
    if (!menuUUID) {
      alert('Menu UUID is required');
      return;
    }

    const newName = prompt('Enter new name:', menu.name || '');
    const newPrice = prompt('Enter new price:', menu.price?.toString() || '');
    const newDescription = prompt(
      'Enter new description:',
      menu.description || ''
    );
    const newAvailability = confirm('Is the menu available?');

    if (!newName || !newPrice || !newDescription) {
      alert('Update canceled. All fields are required.');
      return;
    }

    const updatedMenu: Menu = {
      name: newName,
      price: +newPrice,
      description: newDescription,
      availability: newAvailability,
    };

    this.menuService.updateMenu(menuUUID, updatedMenu).subscribe({
      next: () => {
        this.getMenus();
        alert('Menu updated successfully');
      },
      error: (err) => {
        console.error(err);
        alert('Error updating menu.');
      },
    });
  }

  deleteMenu(menuUUID: string | undefined) {
    this.menuService.deleteMenu(menuUUID).subscribe({
      next: () => this.getMenus(),
      error: (err) => console.error(err),
    });
  }

  viewMenuDetails(menuUUID: string | undefined) {
    this.menuService.getMenuById(menuUUID).subscribe({
      next: (menu) => {
        const details = `
          Name: ${menu.name}
          Description: ${menu.description}
          Price: ${menu.price}
          Availability: ${menu.availability ? 'Yes' : 'No'}
          Created At: ${menu.created_at}
          Updated At: ${menu.updated_at}
        `;
        alert(details);
      },
      error: (err) => console.error(err),
    });
  }
}

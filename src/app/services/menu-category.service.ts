import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuCategory } from '../model/menu-category';

@Injectable({
  providedIn: 'root',
})
export class MenuCategoryService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/menu-category/';

  constructor(private http: HttpClient) {}

  getMenuCategories() {
    return this.http.get<MenuCategory[]>(this.apiUrl);
  }

  getMenuCategoryById(menuUuid: string | undefined) {
    return this.http.get<MenuCategory>(`${this.apiUrl}/${menuUuid}`);
  }

  createMenuCategory(menuCategory: { name: string }) {
    return this.http.post<MenuCategory>(this.apiUrl, menuCategory);
  }

  updateMenuCategory(
    menuUuid: string | undefined,
    menuCategory: { name: string }
  ) {
    return this.http.put<MenuCategory>(
      `${this.apiUrl}/${menuUuid}`,
      menuCategory
    );
  }

  deleteMenuCategory(menuUuid: string | undefined) {
    return this.http.delete(`${this.apiUrl}/${menuUuid}`);
  }
}

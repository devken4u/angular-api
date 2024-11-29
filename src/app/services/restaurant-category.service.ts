import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantCategory } from '../model/restaurant-category';

@Injectable({
  providedIn: 'root',
})
export class RestaurantCategoryService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/restaurant-category/';

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<RestaurantCategory[]>(this.apiUrl);
  }

  getCategoryById(categoryUuid: string | undefined) {
    return this.http.get<RestaurantCategory>(`${this.apiUrl}/${categoryUuid}`);
  }

  createCategory(category: { name: string }) {
    return this.http.post<RestaurantCategory>(this.apiUrl, category);
  }

  updateCategory(categoryUuid: string | undefined, category: { name: string }) {
    return this.http.put<RestaurantCategory>(
      `${this.apiUrl}/${categoryUuid}`,
      category
    );
  }

  deleteCategory(categoryUuid: string | undefined) {
    return this.http.delete(`${this.apiUrl}/${categoryUuid}`);
  }
}

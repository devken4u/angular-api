import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/menu';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = 'https://testsvfcb.pythonanywhere.com/menu/';

  constructor(private http: HttpClient) {}

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.apiUrl);
  }

  getMenuById(menuUUID: string | undefined): Observable<Menu> {
    return this.http.get<Menu>(`${this.apiUrl}/${menuUUID}`);
  }

  createMenu(menu: Menu): Observable<Menu> {
    return this.http.post<Menu>(this.apiUrl, menu);
  }

  updateMenu(menuUUID: string | undefined, menu: Menu): Observable<Menu> {
    return this.http.put<Menu>(`${this.apiUrl}/${menuUUID}`, menu);
  }

  deleteMenu(menuUUID: string | undefined): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${menuUUID}`);
  }
}

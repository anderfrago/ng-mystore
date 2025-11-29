import { Injectable } from '@angular/core';

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:3000/categories';


  getCategories(): Promise<Category[]> {
    return fetch(this.categoriesUrl).then(response => response.json());
  }
}
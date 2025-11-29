import { Injectable } from '@angular/core';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';

  getProducts(): Promise<Product[]> {
 
    return fetch(this.productsUrl).then(response => {
      return response.json();
    });
  }

  getProductById(id: number): Promise<Product > { 
    return fetch(`${this.productsUrl}/${id}`).then(response => response.json());
  }

  createProduct(product: Product): Promise<Product> {
    return fetch(this.productsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(response => response.json()); 
  }

  updateProduct(product: Product): Promise<Product> {
    return fetch(`${this.productsUrl}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    }).then(response => response.json());
  }

  deleteProduct(id: number): Promise<void> {
    return fetch(`${this.productsUrl}/${id}`, {
      method: 'DELETE'
    }).then(() => {});
  }

  getMaxProductId(): Promise<number> {
    return this.getProducts().then(products => Math.max(...products.map(product => product.id)));
  }
}

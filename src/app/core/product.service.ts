import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'http://localhost:3000/products';
  products = signal<Product[]>([]);

  constructor() {}

  getProducts(): Promise<Product[]> {
    return fetch(this.productsUrl)
    .then((response) => response.json())
    .then(data=>{
      this.products.set(data);
      return data;
    })
  }

  // Computed signal for max product ID
  maxProductId = computed(() => {
    const products = this.products();
    if (products.length === 0) {
      return 0;
    }
    return Math.max(...products.map(p => p.id));
  });

  getMaxProductId(): number {
     return this.maxProductId();
  }

  getProductById(id: number): Promise<Product> {
    const url = `${this.productsUrl}/${id}`;
    return fetch(url)
    .then((response) => response.json())
    .then(data=>data)
  }

  createProduct(product: Product): Promise<Product> {
    product.id = 0;
    return fetch(this.productsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    .then((response) => response.json())
    .then((data: Product) => {
      console.log('createProduct: ' + JSON.stringify(data));
      this.products.update((products) => [...products, data]);
      return data;
    });
  }

  deleteProduct(id: number): Promise<void> {
    const url = `${this.productsUrl}/${id}`;
    return fetch(url, {
      method: 'DELETE'
    }).then(() => {
      console.log('deleteProduct: ' + id);
      this.products.update((products) =>
        products.filter((p) => p.id !== id)
      );
    } );
  } 


  updateProduct(product: Product): Promise<Product> {
    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },    
      body: JSON.stringify(product)
    }).then(() => {
      console.log('updateProduct: ' + product.id);
      this.products.update((products) =>
        products.map((p) => (p.id === product.id ? product : p))
      );
      return product;
    });
  }



  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return Promise.reject(errorMessage);
  }
}

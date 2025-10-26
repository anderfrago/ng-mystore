import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  getProducts(): Observable<void> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap((data) => {
        console.log(JSON.stringify(data));
        this.products.set(data);
      }),
      map(() => undefined), // Map to undefined as the signal is updated
      catchError(this.handleError)
    );
  }

  // Computed signal for max product ID
  maxProductId = computed(() => {
    const products = this.products();
    if (products.length === 0) {
      return 0;
    }
    return Math.max(...products.map(p => p.id));
  });

  getMaxProductId(): Observable<number> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      // Get max value from an array
      map((data) =>
        Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        )
      ),
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap((data) => console.log('getProduct: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = 0;
    return this.http
      .post<Product>(this.productsUrl, product, { headers: headers })
      .pipe(
        tap((data) => {
          console.log('createProduct: ' + JSON.stringify(data));
          this.products.update((products) => [...products, data]);
        }),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url, { headers: headers }).pipe(
      tap(() => {
        console.log('deleteProduct: ' + id);
        this.products.update((products) =>
          products.filter((p) => p.id !== id)
        );
      }),
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers: headers }).pipe(
      tap(() => {
        console.log('updateProduct: ' + product.id);
        this.products.update((products) =>
          products.map((p) => (p.id === product.id ? product : p))
        );
      }),
      // Return the product on an update
      map(() => product),
      catchError(this.handleError)
    );
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
    return throwError(errorMessage);
  }
}

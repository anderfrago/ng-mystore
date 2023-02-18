import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Product } from '../shared/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'https://localhost:8000/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any>(this.productsUrl).pipe(
      //tap((data) => console.log(JSON.stringify(data))),
      map((data) => data.products ),
      catchError(this.handleError)
    );
  }

  getMaxProductId(): Observable<number> {
    return this.http.get<any>(this.productsUrl).pipe(
      // Get max value from an array
      map((data) =>{
        if( data.products.length > 0 ) {
          Math.max.apply(
            Math,
            data.products.map(function (o:Product) {
              return o.id ;
            })
          )
          } 
          return 1;
      })
    )
  }


  getProductById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<any>(url).pipe(
     // tap((data) => console.log('getProduct: ' + JSON.stringify(data))),
      map((data) => data ),
      catchError(this.handleError)
    );
  }

  createProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = 0;
    return this.http
      .post<Product>(this.productsUrl+"?XDEBUG_SESSION_START=16653", product, { headers: headers })
      .pipe(
        tap((data) => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<any>(url, { headers: headers }).pipe(
      //tap((data) => console.log('deleteProduct: ' + id)),
      map((data) => data.products ),
      catchError(this.handleError)
    );
  }

  updateProduct(product: Product): Observable<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<Product>(url, product, { headers: headers }).pipe(
      tap(() => console.log('updateProduct: ' + product.id)),
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
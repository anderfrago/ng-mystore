import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../core/product.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService
      .getProducts()
      .subscribe((data: Product[]) => (this.products = data));
  }
}

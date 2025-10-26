import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product';
import { ProductService } from '../core/product.service';
import { ProductItemComponent } from '../products/product-item/product-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
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

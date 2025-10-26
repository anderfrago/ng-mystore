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
  constructor(public productService: ProductService) {} // Make productService public to access in template

  ngOnInit() {
    this.productService.getProducts().subscribe(); // Trigger data fetch, signal is updated in service
  }
}

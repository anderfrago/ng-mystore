import { Component, effect, OnInit, resource } from '@angular/core';
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
export class HomeComponent {
  products: Product[] | undefined = [];

  constructor(private productService: ProductService) {
    const productsResource = resource({
      loader: () => this.productService.getProducts(),
    });
    effect(() => {
      this.products = productsResource.value();
    })

  }

}

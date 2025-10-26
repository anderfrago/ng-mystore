import { Component, input } from '@angular/core';
import { Product } from '../../shared/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
  standalone: true,
  imports: [RouterModule],
})
export class ProductItemComponent {
  readonly product = input<Product>({
    id: 0,
    title: '',
    price: 0,
    rating: 0,
    shortDescription: '',
    description: '',
    categories: [''],
    image: '',
});
}

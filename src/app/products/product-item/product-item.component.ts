import { Component, Input } from '@angular/core';
import { Product } from '../../shared/product';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css'],
    standalone: false
})
export class ProductItemComponent {
  @Input() product: Product = {
    id: 0,
    title: '',
    price: 0,
    rating: 0,
    shortDescription: '',
    description: '',
    categories: [''],
    image: '',
  };
}

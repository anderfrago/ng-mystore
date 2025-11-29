import { Component, Input } from '@angular/core';
import { Product } from '../../shared/product';
import { RouterModule } from '@angular/router';
import { CurrencyPipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
  standalone: true,
  imports: [RouterModule, SlicePipe, CurrencyPipe],
})
export class ProductItemComponent {
  @Input() product: Product = {
    id: 0,
    name: '',
    price: 0,
    rating: 0,
    shortDescription: '',
    description: '',
    categories: [''],
    image: '',
  };
}

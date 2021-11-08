import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Product } from '../../shared/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    rating: 0,
    shortDescription: '',
    description: '',
    categories: [''],
    image: '',
  };
  prodId: number = 0;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.prodId = parseInt(this.activatedroute.snapshot.params['productId']);
    this.productService
      .getProductById(this.prodId)
      .subscribe((data: Product) => (this.product = data));
  }
  goEdit(): void {
    this.router.navigate(['/products', this.prodId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }
}

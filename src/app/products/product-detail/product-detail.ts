import { Component, OnInit, signal } from '@angular/core'; // Import signal
import { ProductService } from '../../core/product.service';
import { Product } from '../../shared/product';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  standalone: true,
  imports: [CommonModule],
})
export class ProductDetailComponent implements OnInit {
  product = signal<Product>({
    id: 0,
    title: '',
    price: 0,
    rating: 0,
    shortDescription: '',
    description: '',
    categories: [''],
    image: '',
  });
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
      .subscribe((data: Product) => this.product.set(data)); // Update the signal
  }
  goEdit(): void {
    this.router.navigate(['/products', this.prodId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }
}

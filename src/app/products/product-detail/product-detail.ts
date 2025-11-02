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
    name: '',
    price: 0,
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

    this.productService.getProductById(this.prodId).then(
      (data: Product) => this.product.set(data)
    );
  }
  
  goEdit(): void {
    this.router.navigate(['/products', this.prodId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }
}

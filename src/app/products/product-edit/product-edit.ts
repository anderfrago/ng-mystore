import {
  Component,
  OnInit,
  signal, // Import signal
  effect // Import effect
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { Product } from '../../shared/product';
import { ProductService } from '../../core/product.service';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './product-edit.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string = '';
  productForm!: FormGroup;

  prodId: number = 0;
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

  constructor(
    private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      categories: '',
      rating: '',
      price: '',
      description: '',
      shortDescription: '',
      image: '',
    });

    // Read the product Id from the route parameter
    this.prodId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getProduct(this.prodId);

    // Use effect to react to product signal changes and update the form
    effect(() => {
      const product = this.product();
      if (this.productForm) {
        this.productForm.reset();
      }
      this.pageTitle = `Edit Product: ${product.title}`;

      // Update the data on the form
      this.productForm.patchValue({
        title: product.title,
        price: product.price,
        rating: product.rating,
        description: product.description,
        shortDescription: product.shortDescription,
        categories: product.categories,
        image: product.image,
      });
    });
  }

  getProduct(id: number): void {
    this.productService.getProductById(id).subscribe(
      (product: Product) => this.product.set(product), // Update the signal
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  deleteProduct(): void {
    if (this.product().id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product().title}?`)) {
        this.productService.deleteProduct(this.product().id).subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
      }
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        this.product.set(this.productForm.value);
        this.product().id = this.prodId;

        this.productService.updateProduct(this.product()).subscribe(
          () => this.onSaveComplete(),
          (error: any) => (this.errorMessage = <any>error)
        );
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.productForm.reset();
    this.router.navigate(['']);
  }
}

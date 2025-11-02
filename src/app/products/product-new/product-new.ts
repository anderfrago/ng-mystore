import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Product } from '../../shared/product';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductService } from '../../core/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.html',
  styleUrls: ['./product-new.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ProductNewComponent implements OnInit {
  pageTitle = 'Product New';
  errorMessage: string = '';
  productForm!: FormGroup;

  prodId: number = 0;

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
    this.prodId = parseInt(this.activatedroute.snapshot.params['productId']);
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const newProduct: Product = { ...this.productForm.value, id: 0 }; // Assign id 0 for new product
        
        this.productService.createProduct(newProduct).then(
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

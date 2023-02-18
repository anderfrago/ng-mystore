import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  id: any;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  newProduct() {
    // Get max product Id from the product list
    this.productService.getMaxProductId().subscribe((data) => (this.id = data));
    this.router.navigate(['/products', this.id, 'new']);
  }
}

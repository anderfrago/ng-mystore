import { Component, OnInit, resource } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  standalone: true,
  imports: [RouterModule],
})
export class NavbarComponent implements OnInit {
  id: any;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  newProduct() {
    // Get max product Id from the product list
    this.id = this.productService.getMaxProductId() + 1;
    this.router.navigate(['/products', this.id, 'new']);
  }
}

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
  id: number = 0;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {}

  newProduct() {
    // Get max product Id from the product list
    const resourceProduct = resource({
      loader: () => this.productService.getMaxProductId(),
    }); 
    this.id = resourceProduct.value()! + 1;
    this.router.navigate(['/products', this.id, 'new']);

  }
}

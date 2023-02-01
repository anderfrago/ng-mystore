import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { HttpClientModule } from '@angular/common/http';

// Import for loading & configuring in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    // InMemoryWebApiModule.forRoot(ProductData),
  ],
  providers: [ProductService],
})
export class CoreModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductItemComponent } from './product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductNewComponent,
    ProductItemComponent,
    ProductEditComponent,
    ProductDetailComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
  exports: [ProductItemComponent],
})
export class ProductsModule {}

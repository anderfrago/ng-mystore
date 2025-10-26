import { Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail/product-detail';
import { ProductEditComponent } from './product-edit/product-edit';
import { ProductNewComponent } from './product-new/product-new';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: ':productId',
    component: ProductDetailComponent,
  },
  {
    path: ':id/edit',
    component: ProductEditComponent,
  },
  {
    path: ':productId/new',
    component: ProductNewComponent,
  },
];

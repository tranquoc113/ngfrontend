import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsListUIService } from '../products-list-ui.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent extends DetailsBase<IProductModel> {
  constructor(route: ActivatedRoute, productListUIService: ProductsListUIService) {
    super(route, productListUIService, 'edit', 'product', ['createOptions']);
  }
}

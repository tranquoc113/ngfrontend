import { Component } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { ActivatedRoute } from '@angular/router';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { ProductsListUIService } from '../products-list-ui.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends DetailsBase<IProductModel> {
  constructor(route: ActivatedRoute, productListUIService: ProductsListUIService) {
    super(route, productListUIService, 'details', 'product');
  }
}

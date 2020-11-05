import { Component, OnInit } from '@angular/core';
import { DetailsBase } from '@objects-view/details-base';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductsListUIService } from '../products-list-ui.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent extends DetailsBase<IProductModel> {
  constructor(route: ActivatedRoute, productListUIService: ProductsListUIService) {
    super(route, productListUIService, 'create', null, ['createOptions']);
  }
}

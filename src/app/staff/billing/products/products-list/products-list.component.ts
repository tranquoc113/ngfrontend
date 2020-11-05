import { Component, OnInit } from '@angular/core';
import { ListBase } from '@objects-view/list-base';
import { ActivatedRoute } from '@angular/router';
import { RefreshService } from '@shared/ui-api/refresh.service';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';
import { ProductsListUIService } from '../products-list-ui.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends ListBase<IProductGroupModel> implements OnInit {

  constructor(
    private route: ActivatedRoute, private productsListUIService: ProductsListUIService,
    private refreshService: RefreshService,
  ) {
    super(route, productsListUIService, refreshService, 'products');
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

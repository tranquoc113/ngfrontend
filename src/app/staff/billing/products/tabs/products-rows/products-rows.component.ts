import { Component, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { LineDirection } from '@objects-view/status-line/status-line.component';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';
import { BaseAction } from '@objects-view/actions/base-action';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ConfigService } from '@shared/config/config.service';
import { Router } from '@angular/router';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';

interface IProductRow {
  product: IProductModel;
  actions: BaseAction[]
}

@Component({
  selector: 'app-products-rows',
  templateUrl: './products-rows.component.html',
  styleUrls: ['./products-rows.component.scss']
})
export class ProductsRowsComponent extends DetailsComponentBase<IProductGroupModel> implements OnInit {
  data: {
    products: Array<IProductModel>;
  };

  constructor(
    public config: ConfigService,
    private router: Router,
    private productsApiService: ProductsApiService
  ) {
    super();
  }

  productRows: IProductRow[] = null;

  statusLineDirection = LineDirection.Vertical;

  ngOnInit() {
    super.ngOnInit();
    this.productRows = []
    if (this.data) {
      for (const product of this.data.products) {
        this.productRows.push({
          product,
          actions: [
            new RouterLinkAction({
              icon: {name: 'edit'},
              name: 'Edit',
              tooltip: 'Edit product',
              routerUrl: this.config.getPanelUrl(`billing/products/${product.id}/edit`),
              router: this.router,
            }),
            new ApiCallAction(
              {
                object: product,
                icon: {name: 'delete'},
                tooltip: 'Delete product',
                name: 'Delete',
                confirmOptions: {
                  confirm: true,
                  title: 'Delete product',
                  message: `Are you sure you want to delete product ${product.name}`,
                },
                successMessage: 'Product deleted',
                errorMessage: 'Failed to delete product, check logs for details',
                apiService: this.productsApiService,
                callType: CallType.Delete,
                refreshAfterExecute: false,
                redirectAfterExecute: true,
                redirectUrl: '/billing/products',
              })
          ]
        });
      }
    }
  }
}

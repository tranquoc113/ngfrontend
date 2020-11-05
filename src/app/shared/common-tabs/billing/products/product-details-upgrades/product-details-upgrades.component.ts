import { Component, OnInit, ViewChild } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { NotificationService } from '@shared/ui-api/notification.service';

@Component({
  selector: 'app-product-details-upgrades',
  templateUrl: './product-details-upgrades.component.html',
  styleUrls: ['./product-details-upgrades.component.scss']
})
export class ProductDetailsUpgradesComponent extends DetailsComponentBase<IProductModel> implements OnInit {
  @ViewChild('upgradesList') upgradesList;
  loading = false;
  upgrades: Array<IProductModel> = [];
  selectedProducts: Array<IProductModel> = [];
  upgradeProducts: {
    [key: string]: boolean;
  };
  constructor(
    private productsApiService: ProductsApiService,
    private notificationService: NotificationService,
  ) {
    super();
  }

  initUpgradeValues() {
    this.upgradeProducts = {};
    for (const product of this.selectedProducts) {
      this.upgradeProducts[product.id] = true;
    }
  }

  saveUpgradeOptions() {
    const productsToSubmit = [];
    for (const selected of this.upgradesList.selectedOptions.selected) {
      productsToSubmit.push(selected.value);
    }
    this.productsApiService.saveUpgrades(this.object.id, productsToSubmit).subscribe(response => {
      this.notificationService.showMessage('Upgrades saved.');
      this.loadData();
    }, error => {
      this.notificationService.showMessage('Failed to save upgrades.');
    });
  }

  loadData() {
    if (this.object) {
      this.loading = true;
      this.productsApiService.getUpgradeOptions(this.object.id).subscribe(response => {
        this.upgrades = response.available_products;
        this.selectedProducts = response.selected_products;
        this.initUpgradeValues();
        this.loading = false;
      }, error => {
        this.loading = false;
        this.notificationService.showMessage('Failed to load upgrade options for product.');
      });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadData();
  }

}

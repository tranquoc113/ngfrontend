import { Component, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { ConfigService } from '@shared/config/config.service';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { ProductCyclesApiService } from '@fleio-api/billing/product-cycles/product-cycles-api.service';
import { NavigationEnd, Router } from '@angular/router';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { ProductCycleEditFormComponent } from '@shared/common-dialogs/billing/products/product-cycle-edit-form/product-cycle-edit-form.component';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-overview',
  templateUrl: './product-details-overview.component.html',
  styleUrls: ['./product-details-overview.component.scss']
})
export class ProductDetailsOverviewComponent extends DetailsComponentBase<IProductModel> implements OnInit, OnDestroy {
  displayedColumns: string[] = ['display_name', 'price_model', 'setup_fee', 'is_relative_price', 'status', 'actions'];
  priceHeading: string;
  actions: {
    [key: string]: Array<IAction>;
  } = {};
  routerSubscription: Subscription;

  constructor(
    public config: ConfigService,
    public productCyclesApiService: ProductCyclesApiService,
    public router: Router,
    private matDialog: MatDialog,
  ) {
    super();
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // needed because on init is not called when navigating to same page
        this.initData();
      }
    })
  }

  initData() {
    if (this.object) {
      if (this.object.price_model === 'dynamic_or_fixed') {
        this.priceHeading = 'Minimum price';
      } else {
        this.priceHeading = 'Fixed price';
      }
      for (const cycle of this.object.cycles) {
        this.actions[cycle.id] = [
          new CallbackAction({
            object: this.object,
            tooltip: 'Edit cycle',
            icon: {name: 'edit'},
            name: 'Edit cycle',
            callback: action => {
              return this.matDialog.open(
                ProductCycleEditFormComponent, {
                  data: {
                    product: this.object,
                    productCycle: cycle,
                  }
                }).afterClosed().pipe(map(result => {
                if (result === 'true' || result === true) {
                  this.router.navigateByUrl(
                    this.config.getPanelUrl(`billing/products/${this.object.id}`)
                  ).catch();
                }
                return {message: result} as IActionResult;
              }));
            }
          }),
          new ApiCallAction({
            object: cycle,
            icon: {name: 'delete'},
            tooltip: 'Delete cycle',
            name: 'Delete',
            confirmOptions: {
              confirm: true,
              title: 'Delete cycle',
              message: `Are you sure?`,
            },
            apiService: this.productCyclesApiService,
            callType: CallType.Delete,
            refreshAfterExecute: true,
            redirectAfterExecute: false,
          })
        ]
      }
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.initData();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }
}

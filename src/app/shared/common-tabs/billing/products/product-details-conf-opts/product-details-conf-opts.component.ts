import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { DetailsComponentBase } from '@objects-view/details-component-base';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { MatDialog } from '@angular/material/dialog';
import { ProductAssociateOptionDialogComponent } from '@shared/common-dialogs/billing/products/product-associate-option-dialog/product-associate-option-dialog.component';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { IAction } from '@objects-view/interfaces/actions/action';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { NotificationService } from '@shared/ui-api/notification.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details-conf-opts',
  templateUrl: './product-details-conf-opts.component.html',
  styleUrls: ['./product-details-conf-opts.component.scss']
})
export class ProductDetailsConfOptsComponent extends DetailsComponentBase<IProductModel> implements OnInit, OnDestroy {
  confOptions: Array<{id: any}> = [];
  displayedColumns = ['name', 'description', 'cycles_match', 'actions'];
  actions: {
    [key: string]: Array<IAction>;
  } = {};
  showLoadingScreen = true; // used to show loading screen only on first refresh and on dialog action
  loading = false;
  optionsSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(
    private matDialog: MatDialog,
    private productsApiService: ProductsApiService,
    private notificationService: NotificationService,
    private router: Router,
    ngZone: NgZone,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(ngZone, changeDetectorRef);
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // needed because on init is not called when navigating to same page
        this.showLoadingScreen = true;
        this.refreshData();
      }
    })
  }

  initActions() {
    for (const option of this.confOptions) {
      this.actions[option.id] = [
        new ApiCallAction({
          object: this.object,
          icon: {name: 'delete'},
          tooltip: 'Dissociate',
          name: 'Dissociate',
          confirmOptions: {
            confirm: true,
            title: 'Dissociate',
            message: `Are you sure?`,
          },
          apiService: this.productsApiService,
          callType: CallType.Post,
          apiAction: 'dissociate_configurable_option',
          apiParams: {
            option: option.id
          },
          refreshAfterExecute: true,
          redirectAfterExecute: false,
        })
      ]
    }
  }

  protected refreshData() {
    super.refreshData();
    if (this.showLoadingScreen) {
      this.loading = true;
    }
    this.optionsSubscription = this.productsApiService.getConfigurableOptions(
      this.object.id
    ).subscribe(response => {
      this.confOptions = response.configurable_options;
      this.initActions();
      this.loading = false;
      this.showLoadingScreen = false;
    }, error => {
      this.loading = false;
      this.showLoadingScreen = false;
      this.notificationService.showMessage('Failed to load configurable options for product.');
    });
  }

  associateOption() {
    this.matDialog.open(
      ProductAssociateOptionDialogComponent, {
        data: {product: this.object}
      }
    ).afterClosed().subscribe(result => {
      if (result === true || result === 'true') {
        this.showLoadingScreen = true;
        this.refreshData();
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.setupRefreshTimer(10000);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.optionsSubscription) {
      this.optionsSubscription.unsubscribe();
      this.optionsSubscription = null;
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }
  }

}

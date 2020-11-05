import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { ConfigService } from '@shared/config/config.service';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { IAction } from '@objects-view/interfaces/actions/action';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ProductUIService } from './product-ui.service';
import { IProductGroupModel } from '@fleio-api/billing/model/product-group.model';
import { ProductGroupsApiService } from '@fleio-api/billing/product-groups/product-groups-api.service';
import { ProductsRowsComponent } from './tabs/products-rows/products-rows.component';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { ProductsApiService } from '@fleio-api/billing/products/product-api.service';
import { IProductModel } from '@fleio-api/billing/model/product.model';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { map } from 'rxjs/operators';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { ProductGroupEditFormComponent } from '@shared/common-dialogs/billing/products/product-group-edit-form/product-group-edit-form.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsListUIService implements IObjectListUIService {
  public noItemsMessage = 'No products';
  private datePipe: DatePipe;

  constructor(
    private router: Router,
    private config: ConfigService,
    private productGroupsApiService: ProductGroupsApiService,
    private matDialog: MatDialog,
    private productsApiService: ProductsApiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ProductUIService(
      object as IProductGroupModel & IProductModel, permissions, state, this.router, this.config, this.productGroupsApiService,
      this.matDialog, this.productsApiService, this.activatedRoute
    );
  }

  getTableData(objectList: FleioObjectsList<IProductGroupModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: '', enableSort: true, fieldName: 'name',
            flex: '1 0 350px', flexXs: '1 0 250px', wrap: true
          },
          {
            type: ColumnType.Actions, displayName: '', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', '(actions)'],
        showStatus: false,
        hideHeader: true,
      },
      rows: [],
      detailComponent: ProductsRowsComponent,
      expandableRows: true,
    };

    for (const object of objectList.objects) {
      const rowUIService = this.getObjectUIService(object, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: `${object.name} (${object.description})`},
        },
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        expandable: (object.products && object.products.length > 0),
        detailComponentData: {products: object.products},
        object,
      };
      // no track by due to detailComponentData updates
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    const actions: Array<IAction> = [];
    actions.push(new CallbackAction({
      tooltip: 'Create product group',
      icon: {name: 'group_work'},
      name: 'Create product group',
      callback: action => {
        return this.matDialog.open(
          ProductGroupEditFormComponent, {
            data: {productGroup: null}
          }).afterClosed().pipe(map(result => {
            if (result === 'true' || result === true) {
              const queryParams = {};
              Object.assign(queryParams, this.activatedRoute.snapshot.queryParams);
              this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams
              }).catch(() => {
                // error has to be handled by interceptor, or where the request is done
              });
            }
            return {message: result} as IActionResult;
        }));
      }
    }));
    actions.push(new RouterLinkAction({
      icon: {name: 'check_box_outline_blank'},
      name: 'Create product',
      tooltip: 'Create product',
      routerUrl: this.config.getPanelUrl(`billing/products/create`),
      router: this.router,
    }));
    return actions;
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}

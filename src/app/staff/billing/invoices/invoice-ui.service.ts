import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../../../shared/ui/common/interfaces/icon';
import { ITitle } from '../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '../../../shared/ui/objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '../../../shared/ui/objects-view/object-ui-service-base';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IDataField } from '../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IInvoiceModel } from '../../../shared/fleio-api/billing/model/invoice.model';
import { IDetailsTab } from '../../../shared/ui/objects-view/interfaces/details/details-tab';
import { InvoiceDetailsOverviewComponent } from '../../../shared/common-tabs/billing/invoices/invoice-details-overview/invoice-details-overview.component';
import { InvoiceDetailsAddPaymentComponent } from '../../../shared/common-tabs/billing/invoices/invoice-details-add-payment/invoice-details-add-payment.component';
import { InvoiceEditFormComponent } from '../../../shared/common-tabs/billing/invoices/invoice-edit-form/invoice-edit-form.component';
import { CallbackAction } from '../../../shared/ui/objects-view/actions/callback-action';
import { InvoicesApiService } from '../../../shared/fleio-api/billing/invoices/invoices-api.service';
import { IClientModel } from '../../../shared/fleio-api/client-user/model/client.model';
import { DatePipe } from '@angular/common';
import { InvoiceDetailsRefundComponent } from '../../../shared/common-tabs/billing/invoices/invoice-details-refund/invoice-details-refund.component';
import { map } from 'rxjs/operators';
import { IActionResult } from '../../../shared/ui/objects-view/interfaces/actions/action-result';
import { InvoiceDeleteDialogComponent } from '../../../shared/common-dialogs/billing/invoices/invoice-delete-dialog/invoice-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export class InvoiceUIService extends ObjectUIServiceBase<IInvoiceModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly invoicesApi: InvoicesApiService;
  private readonly datePipe: DatePipe;
  private readonly matDialog: MatDialog;

  constructor(
    invoice: IInvoiceModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, invoicesApi: InvoicesApiService, matDialog: MatDialog,
  ) {
    super(invoice, permissions, state);
    this.router = router;
    this.config = config;
    this.invoicesApi = invoicesApi;
    this.datePipe = new DatePipe(config.locale);
    this.matDialog = matDialog;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    let status: IObjectStatus = null;
    switch (this.object.status) {
      case 'paid':
        status = {type: StatusType.Defined, value: StatusValue.Paid};
        break;
      case 'cancelled':
        status = {type: StatusType.Defined, value: StatusValue.Cancelled};
        break;
      case 'refunded':
        status = {type: StatusType.Defined, value: StatusValue.Refunded};
        break;
      case 'unpaid':
        if (new Date(this.object.due_date) > new Date()) {
          status = {type: StatusType.Defined, value: StatusValue.Overdue};
        } else {
          status = {type: StatusType.Defined, value: StatusValue.Unpaid};
        }
        break;
    }

    if (['card-view', 'table-view', 'details'].includes(this.state)) {
      return status;
    }

    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'edit':
        return {
          text: `Edit invoice ${this.object.display_number}`,
          subText: this.object.status.toLocaleUpperCase(),
        };
      case 'create':
        return {
          text: `Create invoice`,
        };
      case 'details':
        return {
          text: this.object.name,
          subText: this.object.status.toLocaleUpperCase(),
        };
      default:
        return {
          text: `${this.object.display_number}`,
          subText: this.object.status.toLocaleUpperCase(),
        };
    }
  }

  getActions(): IAction[] {
    return [
      new RouterLinkAction({
        icon: {name: 'edit'},
        name: 'Edit',
        tooltip: 'Edit invoice',
        routerUrl: this.config.getPanelUrl(`billing/invoices/${this.object.id}/edit`),
        router: this.router,
      }),

      new CallbackAction(
        {
          object: this.object,
          tooltip: 'Delete',
          icon: {name: 'delete'},
          name: 'Delete',
          callback: action => {
            return this.matDialog.open(
              InvoiceDeleteDialogComponent, {
                data: {invoiceID: this.object.id}
              }).afterClosed().pipe(map(result => {
                if (result === true) {
                  this.router.navigateByUrl(
                    this.config.getPanelUrl('billing/invoices')
                  ).catch();
                }
              return {message: result} as IActionResult;
            }));
          }
        }
      ),
    ];
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/invoices`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Create invoice'}));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`billing/invoices`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({name: 'Save invoice'}));
        break;
      default:
        break;
    }

    return actions;
  }

  getCardTags(): string[] {
    return [];
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`billing/invoices/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [
      {
        name: 'Issue date',
        value: this.datePipe.transform(this.object.issue_date)
      },
      {
        name: 'Total',
        value: `${this.object.total} ${this.object.currency}`
      },
      {
        name: 'Client',
        value: this.object.client ? `${(this.object.client as IClientModel).name}` : 'n/a',
      }
    ];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Details',
            component: InvoiceDetailsOverviewComponent,
          },
          {
            tabName: 'Add payment',
            component: InvoiceDetailsAddPaymentComponent,
          },
          {
            tabName: 'Refund',
            component: InvoiceDetailsRefundComponent,
          }
        ];
      case 'edit':
      case 'create':
        return [
          {
            tabName: 'Edit',
            component: InvoiceEditFormComponent,
          }
        ];
      default:
        return null;
    }
  }
}

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { ConfigService } from '@shared/config/config.service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { TicketDepartmentsApiService } from '@fleio-api/plugins/tickets/ticket-departments-api.service';
import { ITicketDepartmentModel } from '@fleio-api/plugins/tickets/model/ticket-department.model';
import { DatePipe } from '@angular/common';
import { DepartmentEditFormComponent } from './tabs/department-edit-form/department-edit-form.component';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';

export class DepartmentUiService extends ObjectUIServiceBase<ITicketDepartmentModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly ticketDepartmentsApiService: TicketDepartmentsApiService;
  private readonly matDialog: MatDialog;


  constructor(
    ticketDepartment: ITicketDepartmentModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, ticketDepartmentsApiService: TicketDepartmentsApiService,
    matDialog: MatDialog,
  ) {
    super(ticketDepartment, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.ticketDepartmentsApiService = ticketDepartmentsApiService;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'create':
        return {
          text: `Add department`,
        };
      default:
        return {
          text: `${this.object.name}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    if (this.state !== 'details') {
      actions.push(new RouterLinkAction({
          icon: {name: 'edit', class: 'fl-icons'},
          name: 'Edit',
          tooltip: 'Edit',
          routerUrl: this.config.getPanelUrl(`plugins/tickets/departments/${this.object.id}`),
          router: this.router,
        }
      ));
    }
    actions.push(new ApiCallAction(
      {
        object: this.object,
        icon: {name: 'delete'},
        tooltip: 'Delete',
        name: 'Delete',
        confirmOptions: {
          confirm: true,
          title: 'Delete department',
          message: `Are you sure you want to delete department ${this.object.name}?`,
        },
        successMessage: 'Department deleted',
        errorMessage: 'Failed to delete department, check logs for details',
        apiService: this.ticketDepartmentsApiService,
        callType: CallType.Delete,
        refreshAfterExecute: false,
        redirectAfterExecute: true,
        redirectUrl: this.config.getPanelUrl('plugins/tickets/departments'),
      }
    ));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`plugins/tickets/departments/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    const datePipe = new DatePipe(this.config.locale);
    return [
      {
        name: 'ID',
        value: `${this.object.id}`
      },
      {
        name: 'Created at',
        value: `${datePipe.transform(this.object.created_at, 'medium')}`
      },
      {
        name: 'Email',
        value: `${this.object.email}`
      },
    ];
  }

  getCardTags(): string[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'create':
        return [
          {
            tabName: 'Add department',
            component: DepartmentEditFormComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Department details',
            component: DepartmentEditFormComponent,
          },
        ];
      default:
        return [];
    }
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/tickets/departments`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      case 'create':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/tickets/departments`),
            router: this.router,
          }
        ));

        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      default:
        break;
    }

    return actions;
  }
}

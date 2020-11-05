import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ITicketModel } from '@fleio-api/plugins/tickets/model/ticket.model';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { ConfigService } from '@shared/config/config.service';
import { TicketsApiService } from '@fleio-api/plugins/tickets/tickets-api.service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { CallbackAction } from '@objects-view/actions/callback-action';
import { TicketsOpenNewTabComponent } from './tabs/tickets-open-new-tab/tickets-open-new-tab.component';
import { TicketsUtilsService } from '@fleio-api/plugins/tickets/tickets-utils.service';
import { ApiCallAction, CallType } from '@objects-view/actions/api-call-action';
import { TicketDetailsTabComponent } from './tabs/ticket-details-tab/ticket-details-tab.component';
import { TicketEditFormComponent } from './tabs/ticket-edit-form/ticket-edit-form.component';
import { TicketLinkDialogComponent } from './dialogs/ticket-link-dialog/ticket-link-dialog.component';
import { IActionResult } from '@objects-view/interfaces/actions/action-result';
import { map } from 'rxjs/operators';
import { TicketEditSignaturesFormComponent } from './tabs/ticket-edit-signatures-form/ticket-edit-signatures-form.component';

export class TicketUiService extends ObjectUIServiceBase<ITicketModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly ticketsApiService: TicketsApiService;
  private readonly matDialog: MatDialog;
  private readonly ticketsUtilsService: TicketsUtilsService;
  public static getTicketStatus(object: ITicketModel): {type: StatusType, value: StatusValue} {
    if (object && object.status) {
      switch (object.status) {
        case 'open':
          return {type: StatusType.Defined, value: StatusValue.Active};
        case 'on hold':
          return {type: StatusType.Defined, value: StatusValue.Warning};
        case 'in progress':
          return {type: StatusType.Defined, value: StatusValue.Error};
        case 'done':
          return {type: StatusType.Defined, value: StatusValue.Disabled};
        case 'answered':
          return {type: StatusType.Defined, value: StatusValue.Active};
        case 'customer reply':
          return {type: StatusType.Defined, value: StatusValue.Waiting};
      }
    }
    return {type: StatusType.None, value: StatusValue.None};
  }


  constructor(
    ticket: ITicketModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, ticketsApiService: TicketsApiService, matDialog: MatDialog,
  ) {
    super(ticket, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.ticketsApiService = ticketsApiService;
    this.ticketsUtilsService = new TicketsUtilsService();
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return TicketUiService.getTicketStatus(this.object);
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'user-signatures':
        return {
          text: 'Edit signatures'
        }
      case 'details':
        return {
          text: `#${this.object.id} - ${this.object.title}`,
          subText: `Status: ${this.object.status_display}`
        };
      case 'open-new-ticket':
        return {
          text: `Open a new ticket`,
        }
      default:
        return {
          text: `#${this.object.id} - ${this.object.title}`,
          subText: `Priority: ${this.object.priority_display}`,
          textBold: this.object.unread
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    actions.push(new RouterLinkAction({
        icon: {name: 'edit', class: 'fl-icons'},
        name: 'Edit',
        tooltip: 'Edit',
        routerUrl: this.config.getPanelUrl(`plugins/tickets/${this.object.id}/edit`),
        router: this.router,
      }
    ));

    if (!this.object.unread) {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'markunread'},
          name: 'markunread',
          tooltip: 'Mark as unread',
          confirmOptions: {
            confirm: true,
            title: 'Mark as unread',
            message: 'Mark as unread?',
          },
          apiService: this.ticketsApiService,
          apiAction: 'mark_as_unread',
        }
      ));
    }

    if (this.object.unread) {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'markunread'},
          name: 'mark_as_read',
          tooltip: 'Mark as read',
          confirmOptions: {
            confirm: true,
            title: 'Mark as read',
            message: 'Mark as read?',
          },
          apiService: this.ticketsApiService,
          apiAction: 'mark_as_read',
        }
      ));
    }

    if (this.object.status !== 'in progress' && this.object.status !== 'done') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'play_arrow'},
          name: 'Set in progress',
          tooltip: 'Set in progress',
          confirmOptions: {
            confirm: true,
            title: 'Set in progress',
            message: 'Set in progress?',
          },
          apiService: this.ticketsApiService,
          apiAction: 'set_in_progress',
        }
      ));
    }

    if (this.object.status !== 'on hold' && this.object.status !== 'done') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'stop'},
          name: 'Set on hold',
          tooltip: 'Set on hold',
          confirmOptions: {
            confirm: true,
            title: 'Set on hold',
            message: 'Set on hold?',
          },
          apiService: this.ticketsApiService,
          apiAction: 'set_on_hold',
        }
      ));
    }

    if (this.object.status !== 'done') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'lock'},
          name: 'Close ticket',
          tooltip: 'Close ticket',
          confirmOptions: {
            confirm: true,
            title: 'Close ticket',
            message: 'Close ticket?',
          },
          apiService: this.ticketsApiService,
          apiAction: 'close_ticket',
        }
      ));
    }

    if (this.object.status === 'done') {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'lock_open'},
          name: 'Reopen ticket',
          tooltip: 'Reopen ticket',
          confirmOptions: {
            confirm: true,
            title: 'Reopen ticket',
            message: 'Reopen ticket?',
          },
          apiService: this.ticketsApiService,
          apiAction: 'reopen_ticket',
        }
      ));
    }

    actions.push(new CallbackAction(
      {
        object: this.object,
        icon: {name: 'playlist_add'},
        tooltip: 'Link a ticket',
        name: 'Link a ticket',
        callback: action => {
          return this.matDialog.open(
            TicketLinkDialogComponent, {
              data: {ticket: this.object}
          }).afterClosed().pipe(map(result => {
            if (!result) {
              return ;
            }
            this.router.navigateByUrl(
              this.config.getPanelUrl(`plugins/tickets/${this.object.id}`)
            ).catch();
            return {message: result} as IActionResult;
          }));
        }
      }
    ));

    const deleteActionParams = {
      object: this.object,
      icon: {name: 'delete'},
      name: 'Delete',
      tooltip: 'Delete',
      confirmOptions: {
        confirm: true,
        title: 'Delete ticket',
        message: `Are you sure you want to delete ticket #${this.object.id}?`,
      },
      successMessage: 'Ticket deleted',
      errorMessage: 'Failed to delete ticked, check logs for details',
      apiService: this.ticketsApiService,
      callType: CallType.Delete,
    } as any;

    if (['card-view', 'table-view'].includes(this.state)) {
      deleteActionParams.refreshAfterExecute = true;
    } else {
      deleteActionParams.refreshAfterExecute = false;
      deleteActionParams.redirectAfterExecute = true;
      deleteActionParams.redirectUrl = this.config.getPanelUrl('plugins/tickets');
    }

    actions.push(new ApiCallAction(deleteActionParams));

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`plugins/tickets/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    let departmentRowDisplay = `${this.object.department_display}`;
    if (this.object && this.object.assigned_to) {
      departmentRowDisplay += ` (${this.object.assigned_to_display})`;
    }
    const lastReplyAt = this.ticketsUtilsService.formatLastReply(this.object.last_reply_at);
    return [
      {
        name: 'Client',
        value: `${this.object.client_display}`
      },
      {
        name: 'Status',
        value: `${this.object.status_display}`,
        valueTextAdditionalClasses: ['fl-bold'],
      },
      {
        name: 'Last reply at',
        value: lastReplyAt
      },
      {
        name: 'Department',
        value: departmentRowDisplay
      }
    ];
  }

  getCardTags(): string[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'open-new-ticket':
        return [
          {
            tabName: 'Open new ticket',
            component: TicketsOpenNewTabComponent,
          },
        ];
      case 'details':
        return [
          {
            tabName: 'Details',
            component: TicketDetailsTabComponent,
          },
        ];
      case 'edit':
        return [
          {
            tabName: 'Edit',
            component: TicketEditFormComponent,
          }
        ]
      case 'user-signatures':
        return [
          {
            tabName: 'Signatures',
            component: TicketEditSignaturesFormComponent
          }
        ]
      default:
        return [];
    }
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'open-new-ticket':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/tickets`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Open ticket' }));
        break;
      case 'user-signatures':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`user/profile`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Add signature' }));
        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      case 'edit':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/tickets/${this.object.id}`),
            router: this.router,
          }
        ));
        actions.push(new CallbackAction({ name: 'Save' }));
        break;
      case 'details':
        actions.push(new RouterLinkAction({
            name: 'Cancel',
            routerUrl: this.config.getPrevUrl(`plugins/tickets`),
            router: this.router,
          }
        ));
        if (this.object.status !== 'done') {
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'lock'},
              name: 'Close ticket',
              tooltip: 'Close ticket',
              confirmOptions: {
                confirm: true,
                title: 'Close ticket',
                message: 'Close ticket?',
              },
              apiService: this.ticketsApiService,
              apiAction: 'close_ticket',
            }
          ));
        }
        if (this.object.status === 'done') {
          actions.push(new ApiCallAction(
            {
              object: this.object,
              icon: {name: 'lock_open'},
              name: 'Reopen ticket',
              tooltip: 'Reopen ticket',
              confirmOptions: {
                confirm: true,
                title: 'Reopen ticket',
                message: 'Reopen ticket?',
              },
              apiService: this.ticketsApiService,
              apiAction: 'reopen_ticket',
            }
          ));
          }
        actions.push(new CallbackAction({ name: 'Add note' }));
        actions.push(new CallbackAction({ name: 'Reply' }));
        break;
      default:
        break;
    }

    return actions;
  }
}

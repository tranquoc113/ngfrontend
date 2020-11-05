import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../../../shared/ui/common/interfaces/icon';
import { ITitle } from '../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IObjectStatus, StatusType, StatusValue } from '../../../shared/ui/objects-view/interfaces/object-status';
import { ObjectUIServiceBase } from '../../../shared/ui/objects-view/object-ui-service-base';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { IDataField } from '../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../shared/ui/objects-view/interfaces/details/details-tab';
import { MatDialog } from '@angular/material/dialog';
import { IJournalEntryModel } from '../../../shared/fleio-api/billing/model/journal-entry.model';
import { JournalsApiService } from '../../../shared/fleio-api/billing/journal/journal-api.service';
import { ApiCallAction, CallType } from '../../../shared/ui/objects-view/actions/api-call-action';
import { GatewayApiService } from '../../../shared/fleio-api/billing/gateways/gateway-api.service';
import { CallbackAction } from '../../../shared/ui/objects-view/actions/callback-action';
import { of } from 'rxjs';
import { NotificationService } from '../../../shared/ui-api/notification.service';
import { JournalDetailsOverviewComponent } from '../../../shared/common-tabs/billing/journal/journal-details-overview/journal-details-overview.component';

export class JournalUIService extends ObjectUIServiceBase<IJournalEntryModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly journalsApiService: JournalsApiService;
  private readonly matDialog: MatDialog;
  private readonly gatewayApiService: GatewayApiService;
  private readonly notificationService: NotificationService;

  constructor(
    journal: IJournalEntryModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, journalsApiService: JournalsApiService, matDialog: MatDialog,
    gatewayApiService: GatewayApiService, notificationService: NotificationService
  ) {
    super(journal, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.journalsApiService = journalsApiService;
    this.gatewayApiService = gatewayApiService;
    this.notificationService = notificationService;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return {type: StatusType.None, value: StatusValue.None};
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: 'Journal details'
        }
      default:
        return {
          text: `${this.object.id}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    if (this.object && this.object.transaction && this.object.transaction.actions &&
      Array.isArray(this.object.transaction.actions)) {
      for (const action of this.object.transaction.actions) {
        let actionIcon = 'play_arrow';
        if (action.name === 'refund') {
          actionIcon = 'undo';
        }
        if (action.redirect) {
          actions.push(new CallbackAction(
            {
              object: this.object,
              icon: {name: actionIcon},
              tooltip: action.display,
              name: action.name,
              callback: callbackAction => {
                this.notificationService.confirmDialog(
        {
                    title: `${action.display} transaction`,
                    message: `Do you want to ${action.display.toLowerCase()} transaction?`
                  }
                ).subscribe(result => {
                  if (result === 'yes') {
                    const query = 'invoice=' + this.object.invoice + '&transaction=' + this.object.transaction.id;
                    let redirectUrl = this.config.getPanelApiUrl('billing/gateway/');
                    redirectUrl += action.gateway + '/' + action.name + '?' + query;
                    window.location.href = redirectUrl;
                  }
                });
                return of(null);
              }
            }
          ));
        } else {
          actions.push(new ApiCallAction({
            icon: {name: actionIcon},
            tooltip: action.display,
            name: action.name,
            confirmOptions: {
              confirm: true,
              title: `${action.display} transaction`,
              message: `Do you want to ${action.display.toLowerCase()} transaction?`,
            },
            object: this.object,
            apiService: this.gatewayApiService,
            callType: CallType.Post,
            apiAction: action.name,
            endpointIdentifier: action.gateway,
            apiParams: {
              invoice: this.object.invoice,
              transaction: this.object.transaction.id
            },
          }));
        }
      }
    }

    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`billing/journal/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Overview',
            component: JournalDetailsOverviewComponent
          }
        ]
      default:
        return [];
    }
  }

  getCardTags(): string[] {
    return [];
  }

  getDetailsActions(): IAction[] {
    return [];
  }
}

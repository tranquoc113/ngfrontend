import { MatDialog } from '@angular/material/dialog';
import { ObjectUIServiceBase } from '../../../shared/ui/objects-view/object-ui-service-base';
import { IOperationModel } from '../../../shared/fleio-api/utils/model/operation.model';
import { Router } from '@angular/router';
import { ConfigService } from '../../../shared/config/config.service';
import { OperationsApiService } from '../../../shared/fleio-api/utils/operations/operations-api.service';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { IIcon } from '../../../shared/ui/common/interfaces/icon';
import { IObjectStatus, StatusType, StatusValue } from '../../../shared/ui/objects-view/interfaces/object-status';
import { ITitle } from '../../../shared/ui/objects-view/interfaces/card-data/card-title';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { IDataField } from '../../../shared/ui/objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '../../../shared/ui/objects-view/interfaces/details/details-tab';
import {
  OperationDetailsOverviewComponent
} from './tabs/operation-details-overview/operation-details-overview.component';
import { ApiCallAction } from '../../../shared/ui/objects-view/actions/api-call-action';

export class OperationUiService extends ObjectUIServiceBase<IOperationModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly operationsApiService: OperationsApiService;
  private readonly matDialog: MatDialog;


  constructor(
    operations: IOperationModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, operationsApiService: OperationsApiService, matDialog: MatDialog,
  ) {
    super(operations, permissions, state);
    this.matDialog = matDialog;
    this.router = router;
    this.config = config;
    this.operationsApiService = operationsApiService;
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    let status: IObjectStatus = { type: StatusType.None, value: StatusValue.None };
    if (this.object.status === 'in progress') {
      status = {
        type: StatusType.Changing,
        value: StatusValue.Waiting
      }
    } else if (this.object.status === 'succeeded') {
      status = {
        type: StatusType.Defined,
        value: StatusValue.Success
      }
    } else if (this.object.status === 'failed') {
      status = {
        type: StatusType.Defined,
        value: StatusValue.Failed
      }
    } else if (this.object.status === 'aborted') {
      status = {
        type: StatusType.Defined,
        value: StatusValue.Disabled
      }
    }
    return status;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'details':
        return {
          text: `Operation ${this.object.id}`,
        };

      default:
        return {
          text: `Operation ${this.object.id}`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];
    if (!this.object.completed) {
      actions.push(new ApiCallAction(
        {
          object: this.object,
          icon: {name: 'cancel'},
          tooltip: 'Abort operation',
          name: 'Abort operation',
          confirmOptions: {
            confirm: true,
            title: 'Abort operation',
            message: `Are you sure you want to abort operation ${this.object.id}?`
          },
          apiService: this.operationsApiService,
          apiAction: 'abort_operation',
        }
      ));
    }
    return actions;
  }

  getDetailsLink(): string {
    return this.config.getPanelUrl(`utils/operations/${this.object.id}`);
  }

  getCardFields(): IDataField[] {
    return [
      {
        name: 'Status',
        value: `${this.object.status}`
      },
      {
        name: 'Operation type',
        value: `${this.object.operation_type}`
      },
      {
        name: 'Created by',
        value: `${this.object.initiating_user ? this.object.initiating_user.full_name : 'n/a'}`
      }
    ];
  }

  getCardTags(): string[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'details':
        return [
          {
            tabName: 'Details',
            component: OperationDetailsOverviewComponent,
          },
        ];
    }
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    switch (this.state) {
      case 'details':
        break;
      default:
        break;
    }

    return actions;
  }

  getObjectDetailsRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      if (this.object.completed) {
        return this.config.current.settings.refreshIntervals.defaultInterval;
      } else {
        return this.config.current.settings.refreshIntervals.operationDetailsInterval;
      }
    }
    return 1000;
  }

}

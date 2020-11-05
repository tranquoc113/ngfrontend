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
import { DatePipe } from '@angular/common';
import { IActivityLogModel } from '../../../shared/fleio-api/utils/model/activity-log.model';
import { ActivityLogApiService } from '../../../shared/fleio-api/utils/activity-log/activity-log-api.service';


export class ActivityLogUIService extends ObjectUIServiceBase<IActivityLogModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly activityLogApiService: ActivityLogApiService;
  private readonly datePipe: DatePipe;


  constructor(
    iActivityLogModel: IActivityLogModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, activityLogApiService: ActivityLogApiService
  ) {
    super(iActivityLogModel, permissions, state);
    this.router = router;
    this.config = config;
    this.activityLogApiService = activityLogApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    switch (this.object.type) {
      case 'info':
        return {type: StatusType.Defined, value: StatusValue.Success};
      case 'error':
        return {type: StatusType.Defined, value: StatusValue.Error};
      default:
        return {type: StatusType.Defined, value: StatusValue.Undefined};
    }
  }

  getTitle(): ITitle {
    switch (this.state) {
      default:
        return {
          text: `${this.object.log}`,
          subText: `${this.object.tasks_count} tasks`,
        };
    }
  }

  getActions(): IAction[] {
    const actions: IAction[] = [];

    return actions;
  }

  getDetailsActions(): IAction[] {
    const actions = [];

    return actions;
  }

  getDetailsLink(): string {
    return null;
  }

  getCardFields(): IDataField[] {
    const fields = [];

    return fields;
  }

  getTabs(): IDetailsTab[] {
    return [];
  }

  getCardTags(): string[] {
    const tags = [];

    return tags;
  }
}

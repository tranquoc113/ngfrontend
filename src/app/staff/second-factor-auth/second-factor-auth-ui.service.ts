import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { DatePipe } from '@angular/common';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';
import { ObjectUIServiceBase } from '@objects-view/object-ui-service-base';
import { SfaTypesApiService } from '@fleio-api/core/sfa-types-api.service';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IIcon } from '@shared/ui/common/interfaces/icon';
import { IObjectStatus } from '@objects-view/interfaces/object-status';
import { ITitle } from '@objects-view/interfaces/card-data/card-title';
import { IAction } from '@objects-view/interfaces/actions/action';
import { IDataField } from '@objects-view/interfaces/card-data/data-field';
import { IDetailsTab } from '@objects-view/interfaces/details/details-tab';
import { SfaOptionsOverviewComponent } from '@shared/common-tabs/second-factor-authentication/sfa-options-overview/sfa-options-overview.component';
import { SfaConfirmPasswordFormComponent } from '@shared/common-tabs/second-factor-authentication/sfa-confirm-password-form/sfa-confirm-password-form.component';

export class SecondFactorAuthUiService extends ObjectUIServiceBase<ISfaTypeModel> {
  private readonly router: Router;
  private readonly config: ConfigService;
  private readonly sfaTypesApiService: SfaTypesApiService;
  private readonly datePipe: DatePipe;


  constructor(
    sfaType: ISfaTypeModel, permissions: IPermissionsModel, state: string,
    router: Router, config: ConfigService, sfaTypesApiService: SfaTypesApiService
  ) {
    super(sfaType, permissions, state);
    this.router = router;
    this.config = config;
    this.sfaTypesApiService = sfaTypesApiService;
    this.datePipe = new DatePipe(this.config.locale);
  }

  getIcon(): IIcon {
    return null;
  }

  getStatus(): IObjectStatus {
    return null;
  }

  getTitle(): ITitle {
    switch (this.state) {
      case 'confirm-password':
        return {
          text: 'Confirm password'
        }
      case 'options':
        return {
          text: 'Second factor authentication options'
        }
      default:
        return {
          text: 'Second factor authentication',
        };
    }
  }

  getActions(): IAction[] {
    return [];
  }

  getDetailsActions(): IAction[] {
    return [];
  }

  getCardFields(): IDataField[] {
    return [];
  }

  getTabs(): IDetailsTab[] {
    switch (this.state) {
      case 'confirm-password':
        return [
          {
            tabName: 'Confirm password',
            component: SfaConfirmPasswordFormComponent,
          }
        ]
      case 'options':
        return [
          {
            tabName: 'Options',
            component: SfaOptionsOverviewComponent,
          }
        ]
    }
  }

  getCardTags(): string[] {
    return [];
  }
}

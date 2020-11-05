import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SecondFactorAuthUiService } from './second-factor-auth-ui.service';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { ConfigService } from '@shared/config/config.service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { IAction } from '@objects-view/interfaces/actions/action';
import { SfaTypesApiService } from '@fleio-api/core/sfa-types-api.service';
import { ISfaTypeModel } from '@fleio-api/core/model/sfa-type.model';

@Injectable({
  providedIn: 'root'
})
export class SecondFactorAuthListUiService implements IObjectListUIService {
  constructor(
    private router: Router, private config: ConfigService,
    private sfaTypesApiService: SfaTypesApiService,
  ) {
  }

  getTableData(objectList: FleioObjectsList<IBaseFleioObjectModel>): ITableData {
    return {
      header: {
        columns: [],
        columnNames: [],
      },
      rows: []
    };
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new SecondFactorAuthUiService(
      object as ISfaTypeModel, permissions, state, this.router, this.config, this.sfaTypesApiService,
    );
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}

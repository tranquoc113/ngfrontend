import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IObjectListUIService } from '../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { IPermissionsModel } from '../../../shared/fleio-api/base-model/IPermissionsModel';
import { ConfigService } from '../../../shared/config/config.service';
import { IObjectUIService } from '../../../shared/ui/objects-view/interfaces/object-ui-service';
import { ITableData } from '../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { FleioObjectsList } from '../../../shared/fleio-api/fleio-objects-list';
import { ITableRow } from '../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { ColumnType } from '../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { IAction } from '../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../shared/ui/objects-view/actions/router-link-action';
import { UsersApiService } from '../../../shared/fleio-api/client-user/user/users-api.service';
import { UserUIService } from './user-ui.service';
import { IUserModel } from '../../../shared/fleio-api/client-user/model/user.model';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../shared/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserListUIService implements IObjectListUIService {
  public noItemsMessage = 'No users';
  private readonly datePipe: DatePipe;

  constructor(
    private router: Router,
    private config: ConfigService,
    private usersApi: UsersApiService,
    private auth: AuthService,
  ) {
    this.datePipe = new DatePipe(config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new UserUIService(
      object as IUserModel, permissions, state, this.router, this.config, this.usersApi, this.auth,
    );
  }

  getTableData(objectList: FleioObjectsList<IUserModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Image, displayName: '', enableSort: false, fieldName: '(image)',
            flex: '50px',
          },
          {
            type: ColumnType.Value, displayName: 'Full name', enableSort: false, fieldName: 'full_name',
            flex: '1 0 200px',
          },
          {
            type: ColumnType.Value, displayName: 'Username', enableSort: true, fieldName: 'username',
            flex: '150px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Last login', enableSort: true, fieldName: 'last_login',
            hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'User labels', enableSort: true, fieldName: 'labels',
            hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['(image)', 'full_name', 'username', 'last_login', 'labels', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const object of objectList.objects) {
      const rowUIService = this.getObjectUIService(object, objectList.permissions, 'table-view');
      const user = object as IUserModel;
      const labelsList = [];
      if (object.is_staff) {
        labelsList.push('staff');
      }
      if (object.is_superuser) {
        labelsList.push('superuser');
      }
      if (object.is_reseller) {
        labelsList.push('reseller');
      }
      if (!object.is_active) {
        labelsList.push('inactive');
      }

      const row: ITableRow = {
        cells: {
          full_name: {text: user.full_name},
          username: {text: user.username},
          last_login: {text: user.last_login ? this.datePipe.transform(user.last_login) : 'never'},
          labels: {tags: labelsList}
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: user,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new user',
        tooltip: 'Create new user',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('clients-users/users/create')
      })
    ];
  }

  getRefreshInterval(): number {
    if (this.config && this.config.current && this.config.current.settings &&
      this.config.current.settings.refreshIntervals) {
      return this.config.current.settings.refreshIntervals.defaultInterval;
    }
    return 10000;
  }
}

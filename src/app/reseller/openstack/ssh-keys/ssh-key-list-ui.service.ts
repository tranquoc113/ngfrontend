import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { Router } from '@angular/router';
import { ConfigService } from '@shared/config/config.service';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';
import { PublicKeysApiService } from '@fleio-api/public-key/public-key-api.service';
import { SshKeyUiService } from './ssh-key-ui.service';
import { IPublicKeyModel } from '@fleio-api/public-key/model/public-key.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SshKeyListUIService implements IObjectListUIService {
  public noItemsMessage = 'No SSH keys';

  private readonly datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private publicKeysApiService: PublicKeysApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new SshKeyUiService(
      object as IPublicKeyModel, permissions, state, this.router, this.config, this.publicKeysApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IPublicKeyModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '290px',
          },
          {
            type: ColumnType.Value, displayName: 'Fingerprint', enableSort: false, fieldName: 'fingerprint',
            flex: '370px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            flex: '150px', hide: {xs: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'fingerprint', 'created_at', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const publicKey of objectList.objects) {
      const rowUIService = this.getObjectUIService(publicKey, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: publicKey.name},
          fingerprint: {text: publicKey.fingerprint},
          created_at: {text: this.datePipe.transform(publicKey.created_at)},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: publicKey,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new ssh key',
        tooltip: 'Create new ssh key',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/ssh-keys/create')
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

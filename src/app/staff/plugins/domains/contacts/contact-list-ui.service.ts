import { Injectable } from '@angular/core';
import { IObjectListUIService } from '../../../../shared/ui/objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../shared/config/config.service';
import { DomainContactsApiService } from '../../../../shared/fleio-api/plugins/domains/domain-contacts-api.service';
import { IBaseFleioObjectModel } from '../../../../shared/fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '../../../../shared/fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '../../../../shared/ui/objects-view/interfaces/object-ui-service';
import { ContactUiService } from './contact-ui.service';
import { IDomainContactModel } from '../../../../shared/fleio-api/plugins/domains/model/domain-contact.model';
import { FleioObjectsList } from '../../../../shared/fleio-api/fleio-objects-list';
import { ITableData } from '../../../../shared/ui/objects-view/interfaces/table-data/table-data';
import { ColumnType } from '../../../../shared/ui/objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '../../../../shared/ui/objects-view/interfaces/table-data/table-row';
import { IAction } from '../../../../shared/ui/objects-view/interfaces/actions/action';
import { RouterLinkAction } from '../../../../shared/ui/objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class ContactListUiService implements IObjectListUIService {
  public noItemsMessage = 'No domain contacts';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private domainContactsApiService: DomainContactsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ContactUiService(
      object as IDomainContactModel, permissions, state, this.router, this.config, this.domainContactsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IDomainContactModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Image, displayName: '', enableSort: false, fieldName: '(image)',
            flex: '60px'
          },
          {
            type: ColumnType.Value, displayName: 'ID', enableSort: false, fieldName: 'id',
            flex: '100px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: false, fieldName: 'name',
            flex: '1 1 400px', flexXs: '95%',
          },
          {
            type: ColumnType.Value, displayName: 'Company', enableSort: true, fieldName: 'company',
            flex: '80px', hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
            flex: 'auto', hide: {xs: true},
          },
        ],
        columnNames: [
          '(image)', 'id', 'name', 'company', '(actions)',
        ],
        showStatus: false,
      },
      rows: [],
    };

    for (const contact of objectList.objects) {
      const rowUIService = this.getObjectUIService(contact, objectList.permissions, 'uptodate_credit');
      const row: ITableRow = {
        cells: {
          id: {text: `${contact.id}`},
          name: {text: contact.name},
          company: {text: contact.company || 'n/a'},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        url: rowUIService.getDetailsLink(),
        actions: rowUIService.getActions(),
        object: contact,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new domain contact',
        tooltip: 'Create new domain contact',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('plugins/domains/contacts/create')
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

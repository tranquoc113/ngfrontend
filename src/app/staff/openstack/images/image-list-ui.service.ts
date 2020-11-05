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
import { ImagesApiService } from '@fleio-api/openstack/image/image-api.service';
import { ImageUiService } from './image-ui.service';
import { IImageModel } from '@fleio-api/openstack/model/image.model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ImageListUIService implements IObjectListUIService {
  public noItemsMessage = 'No images';

  private readonly datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private imagesApiService: ImagesApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ImageUiService(
      object as IImageModel, permissions, state, this.router, this.config, this.imagesApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IImageModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Image, displayName: '', enableSort: false, fieldName: '(image)',
            flex: '50px',
          },
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '150px', flexXs: '1 0 34  %'
          },
          {
            type: ColumnType.Value, displayName: 'Status', enableSort: true, fieldName: 'status',
            flex: '120px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Is protected', enableSort: false, fieldName: 'is_protected',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Region', enableSort: false, fieldName: 'region',
            hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Created at', enableSort: true, fieldName: 'created_at',
            hide: {xs: true, sm: true, md: true},
          },
          {
            type: ColumnType.Value, displayName: 'Min disk', enableSort: false, fieldName: 'min_disk',
            hide: {xs: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: [
          '(image)', 'name', 'status', 'is_protected', 'region', 'created_at', 'min_disk', '(actions)'
        ],
        showStatus: true,
      },
      rows: [],
    };

    for (const image of objectList.objects) {
      const rowUIService = this.getObjectUIService(image, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: image.name || image.id as string},
          status: {text: image.status ? image.status.toLocaleUpperCase() : 'n/a'},
          is_protected: {text: image.protected ? 'protected' : ''},
          region: {text: image.region},
          created_at: {text: this.datePipe.transform(image.created_at)},
          min_disk: {text: `${image.min_disk} GB`},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: image,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create new image',
        tooltip: 'Create new image',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/images/create')
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

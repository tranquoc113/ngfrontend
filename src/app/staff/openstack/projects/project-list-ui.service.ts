import { Injectable } from '@angular/core';
import { IObjectListUIService } from '@objects-view/interfaces/object-list-ui-service';
import { DatePipe } from '@angular/common';
import { ProjectsApiService } from '@fleio-api/openstack/project/projects-api.service';
import { ConfigService } from '@shared/config/config.service';
import { Router } from '@angular/router';
import { IBaseFleioObjectModel } from '@fleio-api/base-model/base-fleio-object.model';
import { IPermissionsModel } from '@fleio-api/base-model/IPermissionsModel';
import { IObjectUIService } from '@objects-view/interfaces/object-ui-service';
import { ProjectUiService } from './project-ui.service';
import { IProjectModel } from '@fleio-api/openstack/model/project.model';
import { FleioObjectsList } from '@fleio-api/fleio-objects-list';
import { ITableData } from '@objects-view/interfaces/table-data/table-data';
import { ColumnType } from '@objects-view/interfaces/table-data/column-definition';
import { ITableRow } from '@objects-view/interfaces/table-data/table-row';
import { IAction } from '@objects-view/interfaces/actions/action';
import { RouterLinkAction } from '@objects-view/actions/router-link-action';

@Injectable({
  providedIn: 'root'
})
export class ProjectListUiService implements IObjectListUIService {
  public noItemsMessage = 'No projects';
  private datePipe: DatePipe;

  constructor(
    private router: Router, private config: ConfigService,
    private projectsApiService: ProjectsApiService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getObjectUIService(
    object: IBaseFleioObjectModel, permissions: IPermissionsModel, state: string
  ): IObjectUIService {
    return new ProjectUiService(
      object as IProjectModel, permissions, state, this.router, this.config, this.projectsApiService,
    );
  }

  getTableData(objectList: FleioObjectsList<IProjectModel>): ITableData {
    const tableData: ITableData = {
      header: {
        columns: [
          {
            type: ColumnType.Value, displayName: 'Name', enableSort: true, fieldName: 'name',
            flex: '1 0 150px', flexXs: '70',
          },
          {
            type: ColumnType.Value, displayName: 'Project ID', enableSort: true, fieldName: 'project_id',
            flex: '270px', hide: {xs: true},
          },
          {
            type: ColumnType.Value, displayName: 'Updated at', enableSort: true, fieldName: 'updated_at',
            flex: '1 0 70px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Value, displayName: 'Description', enableSort: false, fieldName: 'description',
            flex: '1 0 180px', hide: {xs: true, sm: true},
          },
          {
            type: ColumnType.Actions, displayName: 'Actions', enableSort: false, fieldName: '(actions)',
          },
        ],
        columnNames: ['name', 'project_id', 'updated_at', 'description', '(actions)'],
        showStatus: true,
      },
      rows: [],
    };

    for (const project of objectList.objects) {
      const rowUIService = this.getObjectUIService(project, objectList.permissions, 'table-view');
      const row: ITableRow = {
        cells: {
          name: {text: project.name},
          project_id: {text: project.project_id},
          updated_at: {text: this.datePipe.transform(project.updated_at)},
          description: {text: project.description},
        },
        icon: rowUIService.getIcon(),
        status: rowUIService.getStatus(),
        actions: rowUIService.getActions(),
        url: rowUIService.getDetailsLink(),
        object: project,
      };

      tableData.trackByFunction = (index, item: ITableRow) => item.object.id;
      tableData.rows.push(row);
    }

    return tableData;
  }

  getActions(objectList: FleioObjectsList<IBaseFleioObjectModel>): IAction[] {
    return [
      new RouterLinkAction({
        name: 'Create project',
        tooltip: 'Create project',
        icon: {name: 'add'},
        router: this.router,
        routerUrl: this.config.getPanelUrl('openstack/projects/create')
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

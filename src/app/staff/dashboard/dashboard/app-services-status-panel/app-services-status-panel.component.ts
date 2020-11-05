import { Component, OnInit } from '@angular/core';
import { AppStatusService } from '@fleio-api/core/app-status.service';
import { AppServicesStatusService } from '@fleio-api/core/app-services-status.service';
import { AppColor } from '@shared/ui/common/enums/app-color.enum';
import { IAppStatus } from '@fleio-api/core/model/app-status.model';
import { IAppServicesStatus } from './app-services-status.model';
import { DatePipe } from '@angular/common';
import { ConfigService } from '@shared/config/config.service';
import * as _moment from 'moment';

@Component({
  selector: 'app-app-services-status-panel',
  templateUrl: './app-services-status-panel.component.html',
  styleUrls: ['./app-services-status-panel.component.scss']
})
export class AppServicesStatusPanelComponent implements OnInit {
  tableData: IAppServicesStatus[] = [];
  displayedColumns: string[] = ['description', 'data'];
  AppColor = AppColor;
  datePipe: DatePipe;
  tableLoaded = false;
  periodicTasks = {
    process_clients_cron_last_run: false,
    collect_traffic_data_last_run: false,
    update_exchange_rates_last_run: false,
    process_scheduled_backups_last_run: false
  };
  periodicTasksArray = Object.keys(this.periodicTasks);

  constructor(
    private appStatusService: AppStatusService,
    private appServicesStatusService: AppServicesStatusService,
    private config: ConfigService,
  ) {
    this.datePipe = new DatePipe(this.config.locale);
  }

  getColor(value: boolean) {
    if (value) {
      return AppColor.Green;
    } else {
      return AppColor.Red;
    }
  }

  loadOtherAppInfo() {
    this.appStatusService.getAppStatus().subscribe((appStatusResponses) => {
      let tableData: IAppServicesStatus;
      for (const item of appStatusResponses) {
        tableData = this.getStatusTableData(item);
        if (tableData) {
          this.tableData.push(tableData);
        }
      }
      // add data for values we did not receive through the api
      for (const missingDataKey in this.periodicTasks) {
        if (this.periodicTasks.hasOwnProperty(missingDataKey)) {
          if (this.periodicTasks[missingDataKey] === false) {
            this.tableData.push(this.getStatusTableData({
              id: null,
              details: {},
              last_updated: null,
              status_type: missingDataKey
            }));
          }
        }
      }
      this.tableLoaded = true;
    });
  }

  ngOnInit(): void {
    this.appServicesStatusService.getServicesStatuses().subscribe(response => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.tableData.push({
            description: key,
            data: {
              value: response[key] ? 'running' : 'not running',
              tag: true,
              bgColor: this.getColor(response[key])
            }
          })
        }
      }
      this.loadOtherAppInfo();
    });
  }

  getPeriodicTaskStatusTableData(item: IAppStatus): IAppServicesStatus {
    let value;
    let color: AppColor;
    if (!item.last_updated) {
      value = 'never';
    } else {
      // @ts-ignore
      const sinceLastRun = new Date() - Date.parse(item.last_updated);
      if (_moment.duration(sinceLastRun).asDays() < 1) {
        color = AppColor.Green;
      } else {
        color = AppColor.Red;
      }
      value = this.datePipe.transform(item.last_updated, 'short');
    }
    return {
      description: this.getPeriodicTaskTableDataDescription(item),
      data: {
        value,
        color
      }
    }
  }

  getPeriodicTaskTableDataDescription(item: IAppStatus): string {
    if (item.status_type === 'process_clients_cron_last_run') {
      return 'Last process clients run';
    }
    if (item.status_type === 'collect_traffic_data_last_run') {
      return 'Last collect traffic data run';
    }
    if (item.status_type === 'update_exchange_rates_last_run') {
      return 'Last update exchange rates run';
    }
    if (item.status_type === 'process_scheduled_backups_last_run') {
      return 'Last process scheduled backups run';
    }
    return '';
  }

  getStatusTableData(item: IAppStatus): IAppServicesStatus {
    if (item.status_type === 'updated_messages_count') {
      return {
        description: 'Updated messages count',
        data: {
          value: item.details.updated_messages_count || 'No data available',
          tooltip: `Last message received at ${this.datePipe.transform(item.last_updated, 'short')}`
        }
      }
    }
    if (this.periodicTasksArray.indexOf(item.status_type) > -1) {
      this.periodicTasks[item.status_type] = true;
      return this.getPeriodicTaskStatusTableData(item);
    }
    return null;
  }

}

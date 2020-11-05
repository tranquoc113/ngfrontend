import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WidgetChartService } from '../widget-chart.service';
import { NotificationService } from '@shared/ui-api/notification.service';
import { Chart } from 'chart.js';
import { InstancesApiService } from '@fleio-api/openstack/instance/instances-api.service';
import { IInstanceSummary } from '@fleio-api/openstack/model/instance-summary.model';

@Component({
  selector: 'app-instances-panel',
  templateUrl: './instances-panel.component.html',
  styleUrls: ['./instances-panel.component.scss']
})
export class InstancesPanelComponent implements OnInit {
  @ViewChild('instancesStateGraph') instancesStateGraph: ElementRef;
  @ViewChild('instancesRegionGraph') instancesRegionGraph: ElementRef;
  @ViewChild('legendState') legendState: ElementRef;
  @ViewChild('legendRegion') legendRegion: ElementRef;
  summary: IInstanceSummary;
  stateOptions = WidgetChartService.options(
    'Instance state distribution',
    'instances-state-doughnut-legend'
  );
  instancesStateGraphChart: Chart;
  regionOptions = WidgetChartService.options(
    'Instance region distribution',
    'instances-region-doughnut-legend'
  );
  instancesRegionGraphChart: Chart;
  selectedTab = 0;

  constructor(
    private instancesApiService: InstancesApiService,
    private notificationService: NotificationService
  ) { }

  loadData() {
    this.instancesApiService.getSummary().subscribe(response => {
      this.summary = response;
      this.createChart();
    }, error => {
      this.notificationService.showMessage('Failed to load instances summary.');
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  createChart() {
    const instancesStateGraphCtx = this.instancesStateGraph.nativeElement.getContext('2d');
    this.instancesStateGraphChart = new Chart(instancesStateGraphCtx, {
      type: 'doughnut',
      data: {
        labels: this.summary.instance_status_labels,
        datasets: [
          {
            backgroundColor: WidgetChartService.getColor,
            data: this.summary.instance_status_data,
          },
        ]
      },
      options: this.stateOptions
    });
    this.legendState.nativeElement.innerHTML = this.stateOptions.legendCallback(this.instancesStateGraphChart);
    const instancesRegionGraphCtx = this.instancesRegionGraph.nativeElement.getContext('2d');
    this.instancesRegionGraphChart = new Chart(instancesRegionGraphCtx, {
      type: 'doughnut',
      data: {
        labels: this.summary.instance_region_labels,
        datasets: [
          {
            backgroundColor: WidgetChartService.getColor,
            data: this.summary.instance_region_data,
          },
        ]
      },
      options: this.regionOptions
    });
    this.legendRegion.nativeElement.innerHTML = this.regionOptions.legendCallback(this.instancesRegionGraphChart);
  }

}
